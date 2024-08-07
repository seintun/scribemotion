import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosUtil";
import Paper from "@mui/material/Paper";
import { AnalysisCard } from "../../components/AnalysisCard";
import { PostDetails } from "../../components/PostDetails";
import { InputField } from "../../components/InputField";
import { useSnackbar } from "../../components/SnackbarContext";

const PostPage = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "Post Title",
    subheader: "08/01/2024",
    text: "Congratulations! You have been selected as the lucky winner of our exclusive lottery! This is a limited time offer, so act now to claim your prize. We are thrilled to inform you that you have won a cash reward that will make you feel ecstatic and jubilant.  To ensure you receive your prize, please provide your bank account details and personal information. This is a risk-free opportunity, and we guarantee that your information will be kept confidential and secure.  We understand that you might feel skeptical, but rest assured, this is a legitimate offer. Many of our previous winners have felt fortunate and grateful after receiving their rewards. Don't miss out on this marvelous chance to improve your financial situation and feel victorious.  If you have any questions, our customer service team is here to help. They are enthusiastic and determined to assist you. Remember, this offer is for a limited time only, so don't delay. Click here to verify your information and claim your prize now!",
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
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <h1>Post Container</h1>
      <InputField text={text} setText={setText} handleSubmit={analyzeText} />
      <PostDetails {...postDetails} onMenuItemClick={handleMenuItemClick} />
      <AnalysisCard result={analysis} />
    </Paper>
  );
};

export default PostPage;
