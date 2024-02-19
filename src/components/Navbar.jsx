import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  Box,
  Switch,
} from "@mui/material";

import { ModeNight } from "@mui/icons-material";

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
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.main,
              display: { xs: "none", sm: "none", md: "block", lg: "block" },
            }}
          >
            قرآن پارسی
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.main,
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            به نام خداوند بخشندترین، مهربانترین
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
                  onChange={handleChapterInputChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9۰-۹]*",
                    sx: { color: theme.palette.text.main },
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
                  onChange={handleVerseInputChange}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9۰-۹]*",
                    sx: { color: theme.palette.text.main },
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="button">
                  جستوجو
                </Button>
              </Grid>
              <Grid item>
                <Switch onChange={toggleTheme} />
                <ModeNight />

                {/* <Button
                  variant="contained"
                  color="button"
                  onClick={toggleTheme}
                >
                  Toggle Theme
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
