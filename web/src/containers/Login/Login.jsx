import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

import axiosInstance from "../../utils/axiosUtil";
import { useSnackbar } from "../../components/SnackbarContext/SnackbarContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showSuccess, showError } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/login/", {
        username,
        password,
      });
      showSuccess("Login successful");
    } catch (error) {
      console.error("There was an error!", error.message);
      if (error.response) {
        showError(error.response.data.message);
      } else {
        showError("An error occurred.");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
