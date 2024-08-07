import React from "react";
import { Button } from "@mui/material";
import { AccountCircle, Logout as LogoutIcon } from "@mui/icons-material";

/**
 * PostAuthButtons component that displays
 * the user's name and a logout button after the user has logged in.
 */
const PostAuthButtons = ({ isMobile, currentUser, openDialog }) => (
  <>
    <Button size="large" color="inherit" startIcon={<AccountCircle />}>
      {!isMobile && currentUser}
    </Button>
    <Button
      size="large"
      onClick={openDialog}
      color="inherit"
      startIcon={<LogoutIcon />}
    >
      {!isMobile && "Logout"}
    </Button>
  </>
);

export default PostAuthButtons;
