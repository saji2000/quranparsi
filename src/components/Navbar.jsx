import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  Box, // Importing Box from MUI
} from "@mui/material";

function Navbar({ toggleTheme }) {
  const theme = useTheme();
  const [chapterInput, setChapterInput] = useState("");
  const [verseInput, setVerseInput] = useState("");

  const handleChapterInputChange = (event) => {
    const { value } = event.target;
    setChapterInput(value.replace(/[^0-9۰-۹]/g, ""));
  };

  const handleVerseInputChange = (event) => {
    const { value } = event.target;
    setVerseInput(value.replace(/[^0-9۰-۹]/g, ""));
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        mt: 1,
        borderRadius: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Grouping the two Typography components into a Box for better alignment */}
        {/* <Box sx={{ flexGrow: 1, display: "flex" }} spacing={2}> */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main,
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
          }}
        >
          قرآن پارسی
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main,
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          به نام خداوند بخشندترین، مهربانترین
        </Typography>
        {/* </Box> */}

        {/* Search Fields - Now using Box for alignment */}
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
                onChange={handleChapterInputChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9۰-۹]*" }}
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
                onChange={handleVerseInputChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9۰-۹]*" }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                جستوجو
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
