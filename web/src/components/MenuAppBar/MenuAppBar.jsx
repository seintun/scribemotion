import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const MenuAppBar = () => {
  const { isLoggedIn } = useAuthContext();
  const { logout } = useAuth();

  const handleMenu = (event) => {
    // Handle menu click
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ScribeMotion - Describe Your Emotions
          </Typography>
          {!isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                startIcon={<PersonAddIcon />}
              >
                Register
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button
                size="large"
                onClick={handleMenu}
                color="inherit"
                startIcon={<AccountCircle />}
              >
                Profile
              </Button>
              <Button
                size="large"
                onClick={logout}
                color="inherit"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Spacer to prevent content from being hidden behind the AppBar */}
      <Toolbar />
    </Box>
  );
};

export default MenuAppBar;
