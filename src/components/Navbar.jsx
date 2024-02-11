import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, TextField } from "@mui/material";
import "./Navbar.css"; // Importing the CSS file for styling

function Navbar() {
  const [chapterInput, setChapterInput] = useState("");
  const [verseInput, setVerseInput] = useState("");

  const handleChapterInputChange = (event) => {
    const { value } = event.target;
    setChapterInput(value.replace(/\D/, ""));
  };

  const handleVerseInputChange = (event) => {
    const { value } = event.target;
    setVerseInput(value.replace(/\D/, ""));
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" className="title">
          قرآن پارسی
        </Typography>
        <div className="search-fields">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                id="chapter-search"
                label="Search Chapter"
                variant="outlined"
                size="small"
                placeholder="Enter chapter number"
                value={chapterInput}
                onChange={handleChapterInputChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="verse-search"
                label="Search Verse"
                variant="outlined"
                size="small"
                placeholder="Enter verse number"
                value={verseInput}
                onChange={handleVerseInputChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
