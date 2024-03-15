import React from "react";
import { useEffect, useState, useContext } from "react";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";
import { digitsEnToFa } from "persian-tools";

const Verse = ({ children, verse_num, chapter_num, arabic }) => {
  const theme = useTheme();

  return (
    <div>
      {" "}
      {arabic ? (
        <Typography
          className="amiri-regular"
          gutterBottom
          dir="rtl"
          variant="h5"
          sx={{ color: theme.palette.text.main }}
        >{`(${digitsEnToFa(chapter_num.toString())}:${digitsEnToFa(
          verse_num.toString()
        )}) ${children}`}</Typography>
      ) : (
        <Typography
          dir="rtl"
          variant="h5"
          sx={{ color: theme.palette.text.main }}
        >
          {children}{" "}
        </Typography>
      )}
    </div>
  );
};

export default Verse;
