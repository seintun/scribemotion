import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

/**
 * PreAuthButtons component that displays
 * login and register buttons before the user has logged in.
 */
const PreAuthButtons = ({ isMobile }) => (
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
);

export default PreAuthButtons;
