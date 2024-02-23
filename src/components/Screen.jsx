import React, { useEffect, useState } from "react";
import data from "../data/sample.json";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";

const Screen = () => {
  const [verses, setVerses] = useState([]);
  useEffect(() => {
    setVerses(data);
  }, []);
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "block",
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing("7em"),
        paddingBottom: theme.spacing(4),
      }}
    >
      {verses.length > 0 ? (
        verses.map((verse) => (
          <Box key={verse.verse_num} sx={{ marginBottom: theme.spacing(2) }}>
            <Typography
              gutterBottom
              dir="rtl"
              variant="h5"
              sx={{ color: theme.palette.text.main }}
            >{`${verse.arabic_text} ${verse.verse_num}`}</Typography>
            {/* <Typography gutterBottom>{verse.english_text}</Typography> */}
            <Typography
              dir="rtl"
              variant="h5"
              sx={{ color: theme.palette.text.main }}
            >
              {verse.persian_text}{" "}
            </Typography>
            {verse.footnote && (
              <>
                <Divider sx={{ background: theme.palette.text.main }} />
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.text.main }}
                >
                  {verse.footnote}
                </Typography>
              </>
            )}
          </Box>
        ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default Screen;
