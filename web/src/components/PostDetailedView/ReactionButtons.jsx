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
 * @param initialReactions.like - Initial count for 'like' reactions.
 * @param initialReactions.love - Initial count for 'love' reactions.
 * @param initialReactions.angry - Initial count for 'angry' reactions.
 * @param initialReactions.celebrate - Initial count for 'celebrate' reactions.
 * @param userReaction - The user's reaction to the post. Can be one of 'like', 'love', 'angry', 'celebrate', or null.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ReactionButtons = ({
  initialReactions = { like: 0, love: 0, angry: 0, celebrate: 0 },
  userReaction = null,
}) => {
  const [reaction, setReaction] = useState(userReaction);
  const [counts, setCounts] = useState(initialReactions);

  const handleReaction = (newReaction) => {
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (reaction === newReaction) {
        updatedCounts[newReaction] -= 1;
        setReaction(null);
      } else {
        if (reaction) updatedCounts[reaction] -= 1;
        updatedCounts[newReaction] += 1;
        setReaction(newReaction);
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
              <Icon color={reaction === type ? "primary" : "inherit"} />
            </IconButton>
          </Badge>
        );
      })}
    </>
  );
};

export default ReactionButtons;
