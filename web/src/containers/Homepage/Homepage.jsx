import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Paper } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { SelectDropdown } from "../../components/SelectDropdown";
import { PostView } from "../PostView";

const Homepage = ({ defaultFilter = "all" }) => {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuthContext();
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
    `/posts?offset=${offset}&limit=${limit}&filter=${filter}&username=${currentUser}`,
    "get"
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line
  }, [offset, filter, currentUser]);

  useEffect(() => {
    if (data) {
      setPosts((previousPosts) => [...previousPosts, ...data]);
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
          value={filter}
          handleFilterChange={handleFilterChange}
        />
      )}
      <PostView
        data={posts}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </Paper>
  );
};

export default Homepage;
