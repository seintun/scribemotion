import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { AnalysisCard } from "../../components/AnalysisCard";
import { PostDetails } from "../../components/PostDetails";
import { InputField } from "../../components/InputField";
import useApi from "../../hooks/useApi";

const PostPage = () => {
  const [text, setText] = useState("");
  const [postDetails, setPostDetails] = useState({
    title: "Post Title",
    subheader: "08/01/2024",
    text: "Congratulations! You have been selected as the lucky winner of our exclusive lottery! This is a limited time offer, so act now to claim your prize. We are thrilled to inform you that you have won a cash reward that will make you feel ecstatic and jubilant.  To ensure you receive your prize, please provide your bank account details and personal information. This is a risk-free opportunity, and we guarantee that your information will be kept confidential and secure.  We understand that you might feel skeptical, but rest assured, this is a legitimate offer. Many of our previous winners have felt fortunate and grateful after receiving their rewards. Don't miss out on this marvelous chance to improve your financial situation and feel victorious.  If you have any questions, our customer service team is here to help. They are enthusiastic and determined to assist you. Remember, this offer is for a limited time only, so don't delay. Click here to verify your information and claim your prize now!",
    avatar: "A",
    menuItems: ["Analyze", "Edit", "Delete"],
  });

  const { data, callApi: analyzeSentiment } = useApi(
    "/analyze-sentiment/",
    "post"
  );

  // Handle menu item click
  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Analyze") {
      analyzeSentiment({ text: postDetails.text });
    }
  };

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <h1>Post Container</h1>
      <InputField
        text={text}
        setText={setText}
        handleSubmit={analyzeSentiment}
      />
      <PostDetails {...postDetails} onMenuItemClick={handleMenuItemClick} />
      <AnalysisCard result={data} />
    </Paper>
  );
};

export default PostPage;
