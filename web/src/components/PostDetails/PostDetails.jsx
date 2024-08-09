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
import { red } from "@mui/material/colors";

import { ActionMenuButton } from "../ActionMenuButton";
import { ReactionButtons } from "../ReactionButtons";

const PostDetails = ({
  postDetails,
  menuItems,
  onMenuItemClick,
  isLoggedIn,
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
    <Card key={id} sx={{ margin: 2, padding: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatar}</Avatar>}
        action={
          <ActionMenuButton
            menuItems={menuItems}
            onMenuItemClick={onMenuItemClick}
            isLoggedIn={isLoggedIn}
          />
        }
        title={title}
        subheader={`by ${author__username} on ${moment(created_at).format(
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
      <CardActions disableSpacing>
        <ReactionButtons
          initialReactions={reactions_count}
          userReaction={user_reacted}
          isLoggedIn={isLoggedIn}
        />
      </CardActions>
    </Card>
  );
};

export default PostDetails;
