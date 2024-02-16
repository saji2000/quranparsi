import React, { useEffect, useState } from "react";
import { Typography, useTheme, Box, Container } from "@mui/material";

const Screen = () => {
  const [verses, setVerses] = useState([]); // The state will now hold an array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../data/sample.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const chapter1Verses = data.filter((verse) => verse.sura_num === 1);
        setVerses(chapter1Verses);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };
    fetchData();
  }, []);
  // const chapter1 = verses.filter((verse) => verse.sura_num === 1);
  const theme = useTheme();

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(4),
      }}
    >
      {verses.length > 0 ? (
        verses.map((verse) => (
          <Box key={verse.verse_num} sx={{ marginBottom: theme.spacing(2) }}>
            <Typography variant="h6" gutterBottom>
              {`Verse ${verse.verse_num}`}
            </Typography>
            <Typography gutterBottom>{verse.arabic_text}</Typography>
            <Typography gutterBottom>{verse.english_text}</Typography>
            <Typography variant="body2">{verse.persian_text}</Typography>
            {verse.footnote && (
              <>
                <Divider />
                <Typography variant="caption">{verse.footnote}</Typography>
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
