import React, { useState } from "react";
import { IconButton, Badge, Tooltip } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  ThumbUp as ThumbUpIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";

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
  userReaction = { like: false, love: false, angry: false, celebrate: false },
  isLoggedIn = false,
  updateReactions,
}) => {
  const [reaction, setReaction] = useState(userReaction);
  const [counts, setCounts] = useState(initialReactions);

  const handleReaction = (newReaction) => {
    updateReactions(newReaction, reaction);
    if (!isLoggedIn) return;
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
          <Badge
            key={type}
            badgeContent={counts[type]}
            color={reaction[type] ? "primary" : "inherit"}
          >
            <Tooltip title={isLoggedIn ? "" : "Please log in to react"}>
              <span>
                <IconButton
                  onClick={() => handleReaction(type)}
                  disabled={!isLoggedIn}
                  style={{ pointerEvents: !isLoggedIn ? "none" : "auto" }}
                >
                  <Icon color={reaction[type] ? "primary" : "inherit"} />
                </IconButton>
              </span>
            </Tooltip>
          </Badge>
        );
      })}
    </>
  );
};

export default ReactionButtons;
