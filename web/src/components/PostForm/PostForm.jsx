import React from "react";
import { Box, TextField, Button } from "@mui/material";

const PostForm = ({ formData, handleChange, handleSubmit }) => (
  <Box component="form" onSubmit={handleSubmit}>
    <TextField
      label="Title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      label="Subheader"
      name="subheader"
      value={formData.subheader}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      label="Text"
      name="text"
      value={formData.text}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      multiline
      rows={4}
    />
    <Button type="submit" variant="contained" color="primary" fullWidth>
      Submit
    </Button>
  </Box>
);

export default PostForm;
