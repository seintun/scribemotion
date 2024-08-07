import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AnalysisInfo from "./AnalysisInfo";

/**
 * Get the scam rating based on the score.
 * The score is between 0 and 10 with Fibonacci sequence.
 */
const getScamRating = (score) => {
  let rating;
  if (score <= 1) {
    rating = "Not Likely";
  } else if (score <= 2) {
    rating = "Possible";
  } else if (score <= 3) {
    rating = "Very Likely";
  } else if (score <= 5) {
    rating = "Highly Likely";
  } else if (score <= 8) {
    rating = "Extremely Cautious";
  } else {
    rating = "Definitely Scam";
  }
  return `${rating} (${score.toFixed(2)})`;
};

/**
 * This component displays the analysis result of the text.
 */
const card = (
  { sentiment, subjective, emotions, matching_words, scam },
  handleClose
) => (
  <>
    <CardContent sx={{ bgcolor: grey[100] }}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Analysis Result
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <AnalysisInfo
          title="Sentiment"
          data={[
            ["Positive", sentiment.positive],
            ["Negative", sentiment.negative],
          ]}
        />
        <AnalysisInfo
          title="Subjective"
          data={[["Subjective", subjective ? "Yes" : "No"]]}
          color={subjective ? "primary" : "default"}
        />
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <AnalysisInfo title="Emotions" data={emotions} color="secondary" />
        <AnalysisInfo
          title="Keywords matched"
          data={matching_words}
          isObject
          color="default"
        />
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <AnalysisInfo
          title="Scam"
          data={[["Scam", getScamRating(scam.score)]]}
          color="error"
        />
        <AnalysisInfo
          title="Keywords matched"
          data={scam.matching_words}
          isObject
          color="default"
        />
      </Grid>
    </CardContent>
    <CardActions>
      <Box sx={{ flexGrow: 1 }} />
      <Button size="small" onClick={handleClose}>
        Dismiss
      </Button>
    </CardActions>
  </>
);

const AnalysisCard = ({ result, onDismiss }) => {
  // Expanded state to show/hide the card when the result is available
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (result) {
      setExpanded(true);
    }
  }, [result]);

  const handleClose = () => {
    setExpanded(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!result) {
    return null;
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Slide direction="left" in={expanded} mountOnEnter unmountOnExit>
        <Card variant="outlined">{card(result, handleClose)}</Card>
      </Slide>
    </Box>
  );
};

export default AnalysisCard;
