import React from "react";
import { Button } from "@mui/material";
import { AccountCircle, Logout as LogoutIcon } from "@mui/icons-material";

/**
 * PostAuthButtons component that displays
 * the user's name and a logout button after the user has logged in.
 */
const PostAuthButtons = ({
  isMobile,
  currentUser,
  openDialog,
  handleProfileClick,
}) => (
  <>
    <Button
      size="large"
      color="inherit"
      onClick={handleProfileClick}
      startIcon={<AccountCircle />}
    >
      {!isMobile && currentUser}
    </Button>
    <Button
      size="large"
      color="inherit"
      onClick={openDialog}
      startIcon={<LogoutIcon />}
    >
      {!isMobile && "Logout"}
    </Button>
  </>
);

export default PostAuthButtons;
