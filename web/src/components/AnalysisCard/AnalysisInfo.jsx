import React from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";

/**
 * This component displays Object based data in a Chip.
 * It displays the key-value pairs in a Chip.
 */
const renderObjectData = (data, color) => {
  return Object.keys(data).map((key) =>
    data[key].map((value, index) => (
      <Chip key={`${key}-${index}`} label={value} color={color} />
    ))
  );
};

/**
 * This component displays Array based data in a Chip.
 * It displays the array elements in a Chip.
 * For Sentiment analysis score, it displays in primary and secondary colors.
 * - If the item[0] is "Positive", it displays the Chip in primary color.
 * - If the item[0] is "Negative", it displays the Chip in secondary color.
 */
const renderArrayData = (data, color) => {
  return data.map((item, index) => {
    let chipColor = color;
    if (item[0] === "Positive") chipColor = "primary";
    if (item[0] === "Negative") chipColor = "secondary";
    return (
      <Chip key={index} label={`${item[0]}: ${item[1]}`} color={chipColor} />
    );
  });
};

/**
 * This component displays the analysis information.
 * Based on the type of data, it displays the information in a Chip.
 * - If the data is an object, it displays the key-value pairs in a Chip.
 * - If the data is an array, it displays the array elements in a Chip.
 */
const AnalysisInfo = ({ title, data, isObject = false, color = "default" }) => (
  <Grid item xs={6}>
    <Typography variant="subtitle1" component="div">
      {title}
    </Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
      {isObject ? renderObjectData(data, color) : renderArrayData(data, color)}
    </Box>
  </Grid>
);

export default AnalysisInfo;
