import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../utils/axiosUtil";
import axios from "axios";

import { useSnackbar } from "../SnackbarContext/SnackbarContext";

const AnalyzeTextView: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
        onChange={(e) => setText(e.target.value)}
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
