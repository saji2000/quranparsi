import React, { useState, useContext } from "react";
import { QuranContext } from "../context/QuranContext";
import BasicMenu from "./Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import { digitsFaToEn } from "persian-tools";

function Navbar({ toggleTheme }) {
  const { setChapter, setVerse } = useContext(QuranContext);

  const theme = useTheme();

  const [verseInput, setVerseInput] = useState(1);
  const [chapterInput, setChapterInput] = useState(1);

  const handleChapterChange = (event) => {
    const { value } = event.target;
    setChapterInput(digitsFaToEn(value.replace(/[^0-9۰-۹]/g, "")) || "");
  };

  const handleVerseChange = (event) => {
    const { value } = event.target;
    setVerseInput(digitsFaToEn(value.replace(/[^0-9۰-۹]/g, "")) || "");
  };

  const scrollToVerse = () => {
    if (document.getElementById(verseInput)) {
      document.getElementById(verseInput).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setTimeout(scrollToVerse, 100);
    }
  };

  const onSubmit = () => {
    if (chapterInput && chapterInput <= 114 && chapterInput >= 1) {
      setChapter(chapterInput);
    } else {
      alert("این سوره موجود نیست");
    }

    if (verseInput && verseInput >= 0 && verseInput <= 286) {
      setVerse(verseInput);
      scrollToVerse();
    } else {
      alert("این ایه موجود نیست");
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          display: "block",
          backgroundColor: theme.palette.secondary.main,
          paddingY: "0.5em",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <BasicMenu toggleTheme={toggleTheme} />

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.main,
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
          >
            قرآن پارسی
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.main,
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            به نام خداوند بخشنده ترین، مهربانترین
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  id="chapter-search"
                  label="شماره سوره"
                  variant="outlined"
                  size="small"
                  placeholder="شماره سوره وارد کنید"
                  value={chapterInput}
                  onChange={handleChapterChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9۰-۹]*",
                    sx: { color: theme.palette.text.main, width: "3em" },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="verse-search"
                  label="شماره ایه"
                  variant="outlined"
                  size="small"
                  placeholder="شماره ایه وارد کنید"
                  value={verseInput}
                  onChange={handleVerseChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9۰-۹]*",
                    sx: { color: theme.palette.text.main, width: "3em" },
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="button" onClick={onSubmit}>
                  جستوجو
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
