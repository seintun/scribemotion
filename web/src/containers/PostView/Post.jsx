import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { AnalysisCard } from "../../components/AnalysisCard";
import { ConfirmDialog, PopupDialog } from "../../components/Dialog";
import { PostDetails } from "../../components/PostDetails";
import { CreatePost } from "../../containers/CreatePost";
import useApi from "../../hooks/useApi";

const Post = ({
  initialPostDetails,
  isLoggedIn,
  isComment = false, // Default value is false for posts
  currentUser,
}) => {
  const navigate = useNavigate();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [postDetails] = useState(initialPostDetails);

  // Actions available based on logged in user and post author
  const postActions =
    isLoggedIn && currentUser === postDetails.author__username
      ? ["View Post", "Analyze", "Edit", "Delete"]
      : ["View Post", "Analyze"];

  // Actions available for comments
  // @feature: Implement comment edit, react and reply
  const avaliableActionsList = isComment ? ["Analyze", "Delete"] : postActions;

  const { data, fetchData: analyzeSentiment } = useApi(
    "/analyze-sentiment/",
    "post"
  );

  const { fetchData: deletePost } = useApi(
    `/post/${postDetails.id}/`,
    "delete"
  );

  const { fetchData: updateReaction } = useApi(`/reaction/`, "post");

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const openEditDialog = () => setEditDialogOpen(true);
  const closeEditDialog = () => setEditDialogOpen(false);
  const handleDelete = () => {
    deletePost();
    setDialogOpen(false);
  };

  const handleReaction = (newReaction, prevReaction) => {
    // Check if all previous reactions are false
    // which means the user is reacting for the first time
    const allFalse = Object.values(prevReaction).every(
      (value) => value === false
    );

    // Identify the previous reaction
    let previous_reaction;
    if (allFalse) {
      previous_reaction = false;
    } else {
      previous_reaction = Object.keys(prevReaction).find(
        (key) => prevReaction[key] === true
      );
    }

    // Create the payload
    const payload = {
      post_id: postDetails.id,
      username: currentUser,
      new_reaction: newReaction,
      previous_reaction: previous_reaction,
    };
    updateReaction(payload);
  };

  // Handle menu item click for ActionMenuButton
  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "View Post") {
      navigate(`/post/${postDetails.id}`);
    } else if (menuItem === "Analyze") {
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
          isComment={isComment}
          updateReactions={handleReaction}
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
