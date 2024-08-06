import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import ReactionButtons from "./ReactionButtons";
import ActionMenuButton from "./ActionMenuButton";

const PostDetails = ({ title, subheader, text, menuItems, avatar }) => {
  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "Analyze") {
      performSentimentAnalysis(text);
    }
  };

  const performSentimentAnalysis = (text) => {
    // Placeholder for sentiment analysis logic
    console.log("Performing sentiment analysis on:", text);
    // You can replace this with actual sentiment analysis API call
  };

  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatar}</Avatar>}
        action={
          <ActionMenuButton
            menuItems={menuItems}
            onMenuItemClick={handleMenuItemClick}
          />
        }
        title={title}
        subheader={subheader}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ReactionButtons />
      </CardActions>
    </Card>
  );
};

export default PostDetails;
