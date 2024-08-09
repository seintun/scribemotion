import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Button, TextField, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { message, register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(username, email, password1, password2);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password1}
              onChange={(event) => setPassword1(event.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Have an account? <Link to="/login">Login</Link>
        </Typography>
        {message && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Register;
