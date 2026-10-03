import { useState, useContext } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, ExpandMore, LightMode } from "@mui/icons-material";
import { digitsEnToFa } from "persian-tools";
import { QuranContext } from "../context/QuranContext";
import { getChapter } from "../data/quran";
import ChapterPicker from "./ChapterPicker";
import BasicMenu from "./Menu";
import logo from "../assets/QuranParsi.png";

function Navbar({ mode, toggleTheme }) {
  const { chapter } = useContext(QuranContext);
  const [pickerOpen, setPickerOpen] = useState(false);
  const current = getChapter(chapter);

  return (
    <AppBar
      position="sticky"
      color="secondary"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
        {/* Logo and name */}
        <Box
          component="img"
          src={logo}
          alt=""
          sx={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 700, display: { xs: "none", sm: "block" } }}
        >
          قرآن پارسی
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Current chapter, opens the chapter/verse picker */}
        <Button
          onClick={() => setPickerOpen(true)}
          color="inherit"
          endIcon={<ExpandMore />}
          sx={{
            bgcolor: "action.hover",
            borderRadius: 999,
            px: 2,
            minWidth: 0,
            maxWidth: { xs: "60vw", sm: "none" },
            "& .MuiButton-endIcon": { marginInlineStart: 0.5, marginInlineEnd: -0.5 },
          }}
        >
          <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {digitsEnToFa(String(chapter))}. {current?.chapter_title_persian}
          </Box>
        </Button>

        <IconButton color="inherit" onClick={toggleTheme} aria-label="تغییر حالت روشن/تاریک">
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
        <BasicMenu />
      </Toolbar>

      <ChapterPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </AppBar>
  );
}

export default Navbar;
