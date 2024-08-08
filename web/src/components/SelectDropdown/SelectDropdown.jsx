import React from "react";
import { MenuItem, Select } from "@mui/material";

const SelectDropdown = ({ filter, handleFilterChange }) => (
  <Select
    value={filter}
    onChange={handleFilterChange}
    sx={{
      marginBottom: 1,
      ml: "auto",
      display: "block",
      width: "fit-content",
    }}
  >
    <MenuItem value="all">All Posts</MenuItem>
    <MenuItem value="user">My Posts</MenuItem>
  </Select>
);

export default SelectDropdown;
