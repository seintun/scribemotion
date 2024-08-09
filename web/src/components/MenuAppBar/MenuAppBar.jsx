import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AppLogo } from "../AppLogo";
import { ConfirmDialog, PopupDialog } from "../Dialog";
import { CreatePost } from "../../containers/CreatePost";

import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import { PostAuthButtons, PreAuthButtons } from "../AuthButtons";

const MenuAppBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { isLoggedIn, currentUser } = useAuthContext();
  const { logout } = useAuth();
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isPostFormDialogOpen, setPostFormDialogOpen] = useState(false);

  const openLogoutDialog = () => setLogoutDialogOpen(true);
  const closeLogoutDialog = () => setLogoutDialogOpen(false);
  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  const openPostFormDialog = () => setPostFormDialogOpen(true);
  const closePostFormDialog = () => setPostFormDialogOpen(false);

  const handleCreatePostClick = () => {
    openPostFormDialog();
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser}`, {
      state: { defaultFilter: "user" },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <AppLogo isMobile={isMobile} />
          {!isLoggedIn && <PreAuthButtons isMobile={isMobile} />}
          {isLoggedIn && (
            <PostAuthButtons
              isMobile={isMobile}
              currentUser={currentUser}
              openDialog={openLogoutDialog}
              handleCreatePostClick={handleCreatePostClick}
              handleProfileClick={handleProfileClick}
            />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <ConfirmDialog
        title={"Are you sure you want to logout?"}
        content={"Press 'Confirm Logout' to proceed with logout."}
        open={isLogoutDialogOpen}
        onClose={closeLogoutDialog}
        onConfirm={handleLogout}
      />
      <PopupDialog
        title={"Create New Post"}
        component={<CreatePost handleDismiss={closePostFormDialog} />}
        open={isPostFormDialogOpen}
        onClose={closePostFormDialog}
      />
    </Box>
  );
};

export default MenuAppBar;
