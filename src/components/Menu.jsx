import { useState } from "react";

import { Link, Menu, MenuItem, Switch, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { ModeNight, MoreVert } from "@mui/icons-material";

export default function BasicMenu({ toggleTheme }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  const [themeState, setThemeState] = useState(false);

  const changeTheme = () => {
    // toggles the theme
    toggleTheme();
    // makes sure the button state is changed
    setThemeState(!themeState);
  };

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
        <MenuItem>
          <ModeNight />
          <Switch onClick={changeTheme} checked={themeState} />
        </MenuItem>
        <Link href="https://discord.gg/submission">
          <MenuItem>دیسکورد</MenuItem>
        </Link>
        <Link href="https://www.tiktok.com/@sajadthesubmitter/">
          <MenuItem>تیکتاک</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
