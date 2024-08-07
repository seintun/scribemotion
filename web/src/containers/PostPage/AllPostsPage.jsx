import React, { useEffect, useState } from "react";
import {
  LinearProgress,
  Paper,
  Typography,
  CircularProgress,
  Badge,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPage from "./PostPage";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const {
    loading,
    data,
    callApi: fetchAllPosts,
  } = useApi(`/posts?offset=${offset}&limit=${limit}`, "get");

  useEffect(() => {
    fetchAllPosts();
  }, [offset]);

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

  if (loading && offset === 0) return <LinearProgress color="secondary" />;
  if (!posts || posts.length === 0) return <EmptyPage />;

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
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
