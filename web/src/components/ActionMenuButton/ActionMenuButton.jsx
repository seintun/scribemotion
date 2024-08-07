import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

const ActionMenuButton = ({ menuItems = [], onMenuItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} disabled={menuItems.length === 0}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.length === 0 ? (
          <Tooltip title="No actions available">
            <MenuItem disabled>No actions available</MenuItem>
          </Tooltip>
        ) : (
          menuItems.map((item, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
              {item}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default ActionMenuButton;
