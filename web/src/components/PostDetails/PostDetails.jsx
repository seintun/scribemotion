import React from "react";
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
  title,
  subheader,
  text,
  avatar,
  menuItems,
  onMenuItemClick,
}) => {
  return (
    <Card sx={{ margin: 2, padding: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatar}</Avatar>}
        action={
          <ActionMenuButton
            menuItems={menuItems}
            onMenuItemClick={onMenuItemClick}
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
