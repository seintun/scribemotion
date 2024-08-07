import React, { useEffect, useState } from "react";
import { LinearProgress, Paper, Typography } from "@mui/material";
import PostPage from "./PostPage";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";

const AllPostsPage = () => {
  const { loading, data, callApi: fetchAllPosts } = useApi("/posts", "get");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) return <LinearProgress color="secondary" />;
  if (!data || data.length === 0) return <EmptyPage />;

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      {data.map((post, index) => (
        <PostPage key={index} initialPostDetails={post} />
      ))}
    </Paper>
  );
};

export default AllPostsPage;
