import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { AnalysisCard } from "../../components/AnalysisCard";
import { PostDetails } from "../../components/PostDetails";
import useApi from "../../hooks/useApi";

const PostPage = ({ initialPostDetails }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [postDetails] = useState(initialPostDetails);

  const { data, callApi: analyzeSentiment } = useApi(
    "/analyze-sentiment/",
    "post"
  );

  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Analyze") {
      setShowAnalysis(true);
      analyzeSentiment({ text: postDetails.text });
    }
    // Handle other menu items (Edit, Delete) here
  };

  const handleDismiss = () => {
    setShowAnalysis(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={showAnalysis ? 7 : 12}>
        <PostDetails
          {...postDetails}
          menuItems={["Analyze", "Edit", "Delete"]}
          onMenuItemClick={handleMenuItemClick}
        />
      </Grid>
      {showAnalysis && (
        <Grid item xs={5}>
          <AnalysisCard result={data} onDismiss={handleDismiss} />
        </Grid>
      )}
    </Grid>
  );
};

export default PostPage;
