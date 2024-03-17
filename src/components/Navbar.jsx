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
  const [chapterVerseInput, setchapterVerseInput] = useState(1);

  const handleChapterVerseChange = (event) => {
    const { value } = event.target;
    setchapterVerseInput(value);
  };

  const handleChapterChange = (event) => {
    const { value } = event.target;
    setChapterInput(value.replace(/[^0-9۰-۹]/g, ""));
  };

  const handleVerseChange = (event) => {
    const { value } = event.target;
    setVerseInput(value.replace(/[^0-9۰-۹]/g, ""));
  };

  const onSubmit = () => {
    // const chapterVerse = chapterVerseInput.split(":");
    // setVerse(digitsFaToEn(chapterVerse[1]));
    // setChapter(digitsFaToEn(chapterVerse[0]));
    setVerse(verseInput);
    setChapter(chapterInput);
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
              {/* <Grid item>
                <TextField
                  id="chapter-search"
                  label="شماره سوره و ایه"
                  variant="outlined"
                  size="small"
                  placeholder="ایه:سوره"
                  value={chapterVerseInput}
                  onChange={handleChapterVerseChange}
                  inputProps={{
                    // inputMode: "numeric",
                    // pattern: "[0-9۰-۹]*",
                    sx: { color: theme.palette.text.main },
                  }}
                />
              </Grid> */}
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
