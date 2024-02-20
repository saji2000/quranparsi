import * as React from "react";

import {
  Button,
  Menu,
  MenuItem,
  Switch,
  Typography,
  useTheme,
  // IconButton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { ModeNight, MoreVert } from "@mui/icons-material";

export default function BasicMenu({ toggleTheme }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: theme.palette.text.main }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>
          <ModeNight />
          <Switch onClick={toggleTheme} />
        </MenuItem>
      </Menu>
    </div>
  );
}
