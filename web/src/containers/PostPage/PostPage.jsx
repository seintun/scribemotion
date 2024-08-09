import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, Paper, Typography } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { EmptyPage } from "../../components/EmptyPage";
import { Post } from "../PostView";

const PostPage = () => {
  const { postId } = useParams();
  const { currentUser, isLoggedIn } = useAuthContext();
  const [post, setPost] = useState(null);

  const {
    loading,
    data: postData,
    fetchData: fetchPost,
  } = useApi(`/post/${postId}?username=${currentUser}`, "get");

  const { data: commentData, fetchData: fetchComments } = useApi(
    `/comments/`,
    "post"
  );

  useEffect(() => {
    fetchPost();
    fetchComments({
      post_id: postId,
      username: currentUser,
    });
  }, [postId, currentUser]);

  useEffect(() => {
    if (postData) {
      setPost(postData);
    }
  }, [postData]);

  if (loading) return <LinearProgress color="secondary" />;
  if (!post) return <EmptyPage />;

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <Typography variant="h5" align="center">
        Post Details
      </Typography>
      <Post
        initialPostDetails={post}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      {/* Comment Section */}
      {commentData &&
        commentData.map((comment) => (
          <Post
            key={comment.id}
            initialPostDetails={comment}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            isComment
          />
        ))}
    </Paper>
  );
};

export default PostPage;
