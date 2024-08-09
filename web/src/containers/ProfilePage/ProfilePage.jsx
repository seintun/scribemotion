import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, Paper, Typography } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { PostView } from "../PostView";

const ProfilePage = ({ defaultFilter = "user" }) => {
  const { username } = useParams();
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
      <Typography variant="h5" align="center">
        {username ?? currentUser}'s Posts
      </Typography>
      <PostView
        data={posts}
        fetchMorePosts={fetchMorePosts}
        hasMore={hasMore}
      />
    </Paper>
  );
};

export default ProfilePage;
