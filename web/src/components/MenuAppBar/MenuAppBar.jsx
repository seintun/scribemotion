import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";

const MenuAppBar = () => {
  const [auth, setAuth] = useState(true);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    // Handle menu click
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} />}
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default MenuAppBar;
