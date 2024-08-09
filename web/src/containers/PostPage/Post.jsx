import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { AnalysisCard } from "../../components/AnalysisCard";
import { ConfirmDialog, PopupDialog } from "../../components/Dialog";
import { PostDetails } from "../../components/PostDetails";
import { CreatePost } from "../../containers/CreatePost";
import useApi from "../../hooks/useApi";

const Post = ({ initialPostDetails, isLoggedIn, removeDeletedPost }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [postDetails] = useState(initialPostDetails);

  // Actions available based on user login status
  const avaliableActionsList = isLoggedIn
    ? ["Analyze", "Edit", "Delete"]
    : ["Analyze"];

  const { data, fetchData: analyzeSentiment } = useApi(
    "/analyze-sentiment/",
    "post"
  );

  const { fetchData: deletePost } = useApi(
    `/post/${postDetails.id}/`,
    "delete"
  );

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const openEditDialog = () => setEditDialogOpen(true);
  const closeEditDialog = () => setEditDialogOpen(false);
  const handleDelete = () => {
    deletePost();
    removeDeletedPost(postDetails.id);
    setDialogOpen(false);
  };

  // Handle menu item click for ActionMenuButton
  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Analyze") {
      setShowAnalysis(true);
      analyzeSentiment({ text: postDetails.text });
    } else if (menuItem === "Delete") {
      openDialog();
    } else if (menuItem === "Edit") {
      openEditDialog();
    }
  };

  const handleDismiss = () => {
    setShowAnalysis(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={showAnalysis ? 7 : 12}>
        <PostDetails
          postDetails={postDetails}
          menuItems={avaliableActionsList}
          onMenuItemClick={handleMenuItemClick}
          isLoggedIn={isLoggedIn}
        />
      </Grid>
      {showAnalysis && (
        <Grid item xs={5}>
          <AnalysisCard result={data} onDismiss={handleDismiss} />
        </Grid>
      )}
      <ConfirmDialog
        title={"Are you sure you want to delete this post?"}
        content={"Press 'Confirm' to proceed with deleting this post."}
        open={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
      />
      <PopupDialog
        title={"Edit Post"}
        component={
          <CreatePost
            method="put"
            postDetails={postDetails}
            handleDismiss={closeEditDialog}
          />
        }
        open={isEditDialogOpen}
        onClose={closeEditDialog}
      />
    </Grid>
  );
};

export default Post;
