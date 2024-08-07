import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AppLogo } from "../AppLogo";
import { ConfirmDialog } from "../ConfirmDialog";

import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import { PostAuthButtons, PreAuthButtons } from "../AuthButtons";

const MenuAppBar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { isLoggedIn, currentUser } = useAuthContext();
  const { logout } = useAuth();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const handleLogout = () => {
    console.log("User logged out");
    logout();
    setDialogOpen(false);
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
              openDialog={openDialog}
            />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <ConfirmDialog
        title={"Are you sure you want to logout?"}
        content={"Press 'Confirm Logout' to proceed with logout."}
        open={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleLogout}
      />
    </Box>
  );
};

export default MenuAppBar;
