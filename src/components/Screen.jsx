import { useEffect, useState, useContext } from "react";
import Verse from "./Verse";
import { QuranContext } from "../context/QuranContext";
import data from "../data/translation.json";
import titles from "../data/titles.json";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";

const Screen = () => {
  const { chapter, verse } = useContext(QuranContext);
  const [verses, setVerses] = useState([]);
  const [title, setTitle] = useState("");

  // setting the title
  useEffect(() => {
    setTitle(titles.filter((d) => d["chapter_number"] == chapter));
  }, [chapter]);

  // setting the verses
  useEffect(() => {
    setVerses(data.filter((d) => d["sura_num"] == chapter));
  }, [chapter]);

  useEffect(() => {
    if (verse && document.getElementById(verse)) {
      document.getElementById(verse).scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
    console.log(verse);
  }, [verse]);

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
      {/* Chapter title */}
      {!title ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <Typography
          className="amiri-regular"
          gutterBottom
          dir="rtl"
          variant="h4"
          sx={{ color: theme.palette.text.main }}
        >
          {title.length > 0
            ? title[0].chapter_title_arabic +
              " | " +
              title[0].chapter_title_persian
            : "Title Not Found"}
        </Typography>
      )}

      {/* Verses */}
      {verses.length > 0 ? (
        verses.map((verse) => (
          <Verse key={verse.verse_num} chapter={chapter}>
            {verse}
          </Verse>
        ))
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Container>
  );
};

export default Screen;
