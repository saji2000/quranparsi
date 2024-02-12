import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import "./Navbar.css"; // Importing the CSS file for styling

function Navbar() {
  const [chapterInput, setChapterInput] = useState("");
  const [verseInput, setVerseInput] = useState("");

  const handleChapterInputChange = (event) => {
    const { value } = event.target;
    setChapterInput(value.replace(/[^0-9۰-۹]/g, "")); // Updated regex to include Arabic numerals
  };

  const handleVerseInputChange = (event) => {
    const { value } = event.target;
    setVerseInput(value.replace(/[^0-9۰-۹]/g, "")); // Updated regex to include Arabic numerals
  };

  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{ backgroundColor: "#00a3cc" }}
    >
      <Toolbar className="toolbar">
        <Typography
          variant="h6"
          component="div"
          className="title"
          sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
        >
          قرآن پارسی
        </Typography>
        <Typography
          variant="h6"
          component="div"
          className="title"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        >
          به نام خداوند بخشندترین، مهربانترین
        </Typography>
        <div className="search-fields">
          <Grid container spacing={"1em"} alignItems="center">
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
              {" "}
              <Button variant="contained">جستوجو</Button>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
