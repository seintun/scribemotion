import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { CreatePost as CreateComment } from "../../containers/CreatePost";
import { EmptyPage } from "../../components/EmptyPage";
import { PopupDialog } from "../../components/Dialog";
import { Post } from "../PostView";

const PostPage = () => {
  const { postId } = useParams();
  const { currentUser, isLoggedIn } = useAuthContext();
  const [post, setPost] = useState(null);
  const [isPostFormDialogOpen, setPostFormDialogOpen] = useState(false);

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

  const openPostFormDialog = () => setPostFormDialogOpen(true);
  const closePostFormDialog = () => setPostFormDialogOpen(false);

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
      <Button onClick={openPostFormDialog} variant="contained" sx={{ ml: 2 }}>
        Add Comment
      </Button>
      <Typography variant="h6" align="center">
        Recent Comments
      </Typography>
      {commentData.length === 0 ? (
        <Typography variant="body1" align="center">
          No comments available
        </Typography>
      ) : (
        commentData.map((comment) => (
          <Post
            key={comment.id}
            initialPostDetails={comment}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            isComment
          />
        ))
      )}
      <PopupDialog
        title={"Create New Comment"}
        component={
          <CreateComment
            endpoint="/create-comment/"
            method="post"
            handleDismiss={closePostFormDialog}
            postId={postId}
          />
        }
        open={isPostFormDialogOpen}
        onClose={closePostFormDialog}
      />
    </Paper>
  );
};

export default PostPage;
