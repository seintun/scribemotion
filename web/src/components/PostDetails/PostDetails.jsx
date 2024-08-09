import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";

import { ActionMenuButton } from "../ActionMenuButton";
import { ReactionButtons } from "../ReactionButtons";

const PostDetails = ({
  postDetails,
  menuItems,
  onMenuItemClick,
  isLoggedIn,
  isComment,
  updateReactions,
}) => {
  const {
    id,
    author__username,
    avatar,
    created_at,
    title,
    subheader,
    text,
    reactions_count,
    user_reacted,
  } = postDetails;

  return (
    <Card
      key={id}
      sx={{
        margin: 2,
        padding: 3,
        bgcolor: isComment ? grey[300] : undefined,
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatar}</Avatar>}
        action={
          <ActionMenuButton
            menuItems={menuItems}
            onMenuItemClick={onMenuItemClick}
          />
        }
        title={title}
        subheader={`${isComment ? "commented" : "posted"}
         by ${author__username} on ${moment(created_at).format(
          "MM/DD/YYYY HH:mm:ss"
        )}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {subheader}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text}
        </Typography>
      </CardContent>
      {!isComment && (
        <CardActions disableSpacing>
          <ReactionButtons
            initialReactions={reactions_count}
            userReaction={user_reacted}
            isLoggedIn={isLoggedIn}
            updateReactions={updateReactions}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default PostDetails;
