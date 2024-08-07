import React, { useState } from "react";
import { AnalysisCard } from "../../components/AnalysisCard";
import { PostDetails } from "../../components/PostDetails";
import useApi from "../../hooks/useApi";

const PostPage = ({ initialPostDetails }) => {
  const [postDetails] = useState(initialPostDetails);

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
    <>
      <PostDetails {...postDetails} onMenuItemClick={handleMenuItemClick} />
      <AnalysisCard result={data} />
    </>
  );
};

export default PostPage;
