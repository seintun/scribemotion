import React from "react";
import { Link } from "react-router-dom";
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
    created_at,
    title,
    subheader,
    text,
    reactions_count,
    user_reacted,
  } = postDetails;

  const author_createdby_subheader = (
    <>
      {isComment ? "commented" : "posted"} by{" "}
      <Link to={`/profile/${author__username}`}>{author__username}</Link> on{" "}
      {moment(created_at).format("MM/DD/YYYY HH:mm:ss")}
    </>
  );

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
        avatar={
          <Link to={`/profile/${author__username}`}>
            <Avatar sx={{ bgcolor: red[500] }}>
              {author__username.charAt(0)}
            </Avatar>
          </Link>
        }
        action={
          <ActionMenuButton
            menuItems={menuItems}
            onMenuItemClick={onMenuItemClick}
          />
        }
        title={title}
        subheader={author_createdby_subheader}
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
