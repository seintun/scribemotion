import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Deblur as AppIcon } from "@mui/icons-material";

const AppLogo = ({ isMobile }) => (
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
);

export default AppLogo;

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
