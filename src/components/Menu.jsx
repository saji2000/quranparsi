import { useState } from "react";

import {
  Button,
  Link,
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
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem>
          <ModeNight />
          <Switch onClick={toggleTheme} />
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
