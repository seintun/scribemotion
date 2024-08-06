import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../utils/axiosUtil";

import { useSnackbar } from "../SnackbarContext/SnackbarContext";

const AnalyzeTextView = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const { showError } = useSnackbar();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/analyze-sentiment/", {
        text,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      if (axios.isAxiosError(error) && error.response) {
        showError(`Error: ${error.response.data.error || error.response.data}`);
      } else {
        showError("Error analyzing sentiment");
      }
    } finally {
      setLoading(false);
    }
  };

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

export default AnalyzeTextView;