import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

const AnalyzeText = ({ text, setText, result, loading, handleSubmit }) => {
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
      {loading && <CircularProgress />}
      {result && (
        <Typography variant="body1" marginTop="20px">
          {typeof result === "string" ? result : JSON.stringify(result)}
        </Typography>
      )}
    </Container>
  );
};

export default AnalyzeText;
