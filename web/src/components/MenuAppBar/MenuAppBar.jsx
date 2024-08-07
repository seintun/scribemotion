import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Deblur as AppIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const MenuAppBar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { isLoggedIn, currentUser } = useAuthContext();
  const { logout } = useAuth();

  const handleMenu = (event) => {
    // Handle menu click
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <>
            <Link to="/" style={linkStyle}>
              <AppIcon sx={{ mr: 1 }} />
            </Link>
            <Link to="/" style={textLinkStyle}>
              <Typography variant="h6" component="div">
                {!isMobile && "ScribeMotion"}
              </Typography>
            </Link>
          </>
          {!isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
              >
                {!isMobile && "Login"}
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                startIcon={<PersonAddIcon />}
              >
                {!isMobile && "Register"}
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
                {!isMobile && currentUser}
              </Button>
              <Button
                size="large"
                onClick={logout}
                color="inherit"
                startIcon={<LogoutIcon />}
              >
                {!isMobile && "Logout"}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default MenuAppBar;

const linkStyle = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
};

const textLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  flexGrow: 1,
};
