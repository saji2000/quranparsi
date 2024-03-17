import React from "react";
import { useEffect, useState, useContext } from "react";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";
import { digitsEnToFa } from "persian-tools";

const Verse = ({ children, chapter }) => {
  const theme = useTheme();

  return (
    <Box
      key={children.verse_num}
      id={children.verse_num}
      sx={{ marginBottom: theme.spacing(5) }}
    >
      {/* Subtitle */}
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: theme.palette.text.main, marginBottom: theme.spacing(2) }}
      >
        {children.subtitle}{" "}
      </Typography>
      {/* Arabic text */}
      <Typography
        className="amiri-regular"
        gutterBottom
        dir="rtl"
        variant="h5"
        sx={{ color: theme.palette.text.main }}
      >{`(${digitsEnToFa(chapter.toString())}:${digitsEnToFa(
        children.verse_num.toString()
      )}) ${children.arabic_text}`}</Typography>
      {/* Persian text */}
      <Typography
        dir="rtl"
        variant="h5"
        sx={{ color: theme.palette.text.main, marginBottom: theme.spacing(2) }}
      >
        {children.persian_text}{" "}
      </Typography>
      {/* Footnote */}
      {children.footnote && (
        <>
          <Divider sx={{ background: theme.palette.text.main }} />
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.main }}
          >
            {children.footnote}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Verse;
