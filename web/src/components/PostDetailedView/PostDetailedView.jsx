import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ReactionButtons from "./ReactionButtons";

const PostDetailedView = () => {
  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>A</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Feedback on Bogus Offer"
        subheader="August 8, 2024"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          "I'm really frustrated with this bogus offer claiming a free prize.
          It's obviously a scam to get my personal details."
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ReactionButtons />
      </CardActions>
    </Card>
  );
};

export default PostDetailedView;
