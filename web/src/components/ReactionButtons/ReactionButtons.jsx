import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const iconMap = {
  like: ThumbUpIcon,
  love: FavoriteIcon,
  angry: SentimentVeryDissatisfiedIcon,
  celebrate: EmojiEventsIcon,
};

/**
 * ReactionButtons component allows users to react to a post with different reactions.
 *
 * @param initialReactions - An object containing the initial counts for each reaction type.
 * @param userReaction - An object containing the user's reaction as a boolean value for each reaction type.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ReactionButtons = ({
  initialReactions = { like: 0, love: 0, angry: 0, celebrate: 0 },
  userReaction = null,
}) => {
  console.log(userReaction);
  const [reaction, setReaction] = useState(userReaction);
  const [counts, setCounts] = useState(initialReactions);

  const handleReaction = (newReaction) => {
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };

      // Remove the previous reaction if it exists
      Object.keys(reaction).forEach((type) => {
        if (reaction[type]) {
          updatedCounts[type] -= 1;
          setReaction((prevReaction) => ({
            ...prevReaction,
            [type]: false,
          }));
        }
      });

      // Add the new reaction if it doesn't exist
      if (!reaction[newReaction]) {
        updatedCounts[newReaction] += 1;
        setReaction((prevReaction) => ({
          ...prevReaction,
          [newReaction]: true,
        }));
      }

      return updatedCounts;
    });
  };

  return (
    <>
      {Object.keys(counts).map((type) => {
        const Icon = iconMap[type];
        return (
          <Badge key={type} badgeContent={counts[type]} color="primary">
            <IconButton onClick={() => handleReaction(type)}>
              <Icon color={reaction[type] ? "primary" : "inherit"} />
            </IconButton>
          </Badge>
        );
      })}
    </>
  );
};

export default ReactionButtons;
