import React from "react";
import { Paper, Typography } from "@mui/material";

const EmptyPage = () => (
  <Paper elevation={3} sx={{ margin: 2, padding: 2, textAlign: "center" }}>
    <Typography variant="h6">No posts available</Typography>
  </Paper>
);

export default EmptyPage;
