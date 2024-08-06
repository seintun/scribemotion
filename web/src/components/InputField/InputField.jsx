import React from "react";
import { TextField, Button, Container } from "@mui/material";

const InputField = ({ text, setText, result, loading, handleSubmit }) => {
  return (
    <Container>
      <TextField
        label="Enter text"
        variant="outlined"
        fullWidth
        value={text}
        onChange={(event) => setText(event.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </Button>
    </Container>
  );
};

export default InputField;
