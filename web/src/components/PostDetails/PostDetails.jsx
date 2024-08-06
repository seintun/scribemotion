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

const PostDetails = ({
  title,
  subheader,
  text,
  menuItems,
  avatar,
  onMenuItemClick,
}) => {
  return (
    <Card sx={{ margin: 3, padding: 3 }}>
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
