import React, { useEffect, useState } from "react";
import {
  Badge,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPage from "./PostPage";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { CreatePost } from "../../containers/CreatePost";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("all"); // Default `all` filter for posts
  const limit = 5;

  const {
    loading,
    data,
    fetchData: fetchAllPosts,
  } = useApi(`/posts?offset=${offset}&limit=${limit}&filter=${filter}`, "get");

  useEffect(() => {
    fetchAllPosts();
  }, [offset, filter]);

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMore(data.length === limit);
    }
  }, [data]);

  const fetchMorePosts = () => {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  // Handle filter change for changes in filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPosts([]); // Clear posts when filter changes
    setOffset(0); // Reset offset when filter changes
  };

  if (loading && offset === 0) return <LinearProgress color="secondary" />;
  if (!posts || posts.length === 0) return <EmptyPage />;

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <Select
        value={filter}
        onChange={handleFilterChange}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="all">All Posts</MenuItem>
        <MenuItem value="user">My Posts</MenuItem>
      </Select>
      <CreatePost />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={
          <Typography variant="body2" color="textSecondary" align="center">
            You have reached the end of the feed.
          </Typography>
        }
      >
        {posts.map((post, index) => (
          <div key={index} style={{ position: "relative" }}>
            <Badge
              badgeContent={index + 1}
              color="primary"
              overlap="circular"
              sx={{ left: 15, top: 15 }}
            />
            <PostPage initialPostDetails={post} />
          </div>
        ))}
      </InfiniteScroll>
    </Paper>
  );
};

export default AllPostsPage;
