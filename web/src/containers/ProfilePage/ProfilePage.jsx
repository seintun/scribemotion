import React, { useEffect, useState } from "react";
import { LinearProgress, Paper } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { PostPage } from "../PostPage";

const ProfilePage = ({ defaultFilter = "user", username = null }) => {
  const { currentUser } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter] = useState(defaultFilter);
  const limit = 5;

  const {
    loading,
    data,
    fetchData: fetchAllPosts,
  } = useApi(
    `/posts?offset=${offset}&limit=${limit}&filter=${filter}&user=${
      username ?? currentUser
    }`,
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

  if (loading && offset === 0) return <LinearProgress color="secondary" />;
  if (!posts || posts.length === 0) return <EmptyPage />;

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <PostPage
        data={posts}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
      />
    </Paper>
  );
};

export default ProfilePage;