import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, Paper, Typography } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { Post } from "../PostView";

const PostPage = () => {
  const { postId } = useParams();
  const { currentUser } = useAuthContext();
  const [post, setPost] = useState(null);

  const {
    loading,
    data,
    fetchData: fetchPost,
  } = useApi(`/post/${postId}?username=${currentUser}`, "get");

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPost(data);
    }
  }, [data]);

  if (loading) return <LinearProgress color="secondary" />;
  if (!post) return <EmptyPage />;
  return <></>;
  // return (
  //   <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
  //     <Typography variant="h5" align="center">
  //       Post Details
  //     </Typography>
  //     <Post
  //       initialPostDetails={post}
  //       isLoggedIn={!!currentUser}
  //       currentUser={currentUser}
  //     />
  //   </Paper>
  // );
};

export default PostPage;
