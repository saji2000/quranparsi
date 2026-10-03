import { useState } from "react";
import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const links = [
  { label: "دیسکورد", href: "https://discord.gg/submission" },
  { label: "تیکتاک", href: "https://www.tiktok.com/@sajadthesubmitter/" },
];

export default function BasicMenu() {
  // Anchor for opening and closing the menu
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="منو"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ marginInlineEnd: -1 }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {links.map((link) => (
          <MenuItem
            key={link.href}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener"
            onClick={() => setAnchorEl(null)}
          >
            <ListItemText>{link.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
