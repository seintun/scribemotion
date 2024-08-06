import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosUtil";
import Paper from "@mui/material/Paper";
import { AnalyzeText } from "../../components/AnalyzeText";
import { PostDetails } from "../../components/PostDetails";
import { useSnackbar } from "../../components/SnackbarContext/SnackbarContext";

const PostPage = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "Post Title",
    subheader: "Post Subheader",
    text: "I'm absolutely delighted with the fantastic service I received! The team was professional and friendly, making my experience wonderful.",
    avatar: "A",
    menuItems: ["Analyze", "Edit", "Delete"],
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useSnackbar();

  // Function to handle text analysis
  const analyzeText = async (text) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/analyze-sentiment/", {
        text,
      });
      setAnalysis(response.data);
      showSuccess("Sentiment analysis complete");
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

  // Handle menu item click
  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Analyze") {
      console.log("Analyze clicked", postDetails.text);
      analyzeText(postDetails.text);
    }
    // Handle other menu items if needed
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <h1>Post Container</h1>
      <AnalyzeText
        text={text}
        setText={setText}
        result={analysis}
        loading={loading}
        handleSubmit={analyzeText}
      />
      <PostDetails {...postDetails} onMenuItemClick={handleMenuItemClick} />
    </Paper>
  );
};

export default PostPage;
