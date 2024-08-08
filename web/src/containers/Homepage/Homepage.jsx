import React, { useEffect, useState } from "react";
import { LinearProgress, Paper } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { SelectDropdown } from "../../components/SelectDropdown";
import { CreatePost } from "../CreatePost";
import { PostPage } from "../PostPage";

const Homepage = ({ defaultFilter = "all" }) => {
  const { currentUser } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState(defaultFilter); // Default `all` filter for posts
  const limit = 5;

  const {
    loading,
    data,
    fetchData: fetchAllPosts,
  } = useApi(
    `/posts?offset=${offset}&limit=${limit}&filter=${filter}&user=${currentUser}`,
    "get"
  );

  useEffect(() => {
    fetchAllPosts();
  }, [offset, filter, currentUser]);

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
      {defaultFilter === "all" && (
        <SelectDropdown
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      )}
      {/* <CreatePost /> */}
      <PostPage
        data={posts}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
      />
    </Paper>
  );
};

export default Homepage;
