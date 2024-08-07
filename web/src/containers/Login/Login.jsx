import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "../../components/SnackbarContext";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showSuccess, showError } = useSnackbar();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
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
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
