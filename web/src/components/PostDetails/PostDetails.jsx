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

import ReactionButtons from "./ReactionButtons";
import ActionMenuButton from "./ActionMenuButton";

const PostDetails = ({ title, subheader, text, avatar, onMenuItemClick }) => {
  return (
    <Card sx={{ margin: 3, padding: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{avatar}</Avatar>}
        action={
          <ActionMenuButton
            menuItems={["Analyze", "Edit", "Delete"]}
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
