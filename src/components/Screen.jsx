import { useEffect, useState, useContext } from "react";
import { QuranContext } from "../context/QuranContext";
import data from "../data/translation.json";
import titles from "../data/titles.json";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";

const Screen = () => {
  const { chapter, verse } = useContext(QuranContext);
  const [verses, setVerses] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setVerses(data.filter((d) => d["sura_num"] == chapter));
  }, [chapter]);

  useEffect(() => {
    setTitle(titles.filter((d) => d["chapter_num"] == chapter));
  }, [chapter]);

  useEffect(() => {
    if (verse && document.getElementById(verse)) {
      getElementById(verse).scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
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
      <Typography variant="h5">{title.chapter_title_arabic}</Typography>
      {/* {console.log("verses:", verses)} */}
      {verses.length > 0 ? (
        verses.map((verse) => (
          <Box
            key={verse.verse_num}
            id={verse.verse_num}
            sx={{ marginBottom: theme.spacing(5) }}
          >
            <Typography
              className="amiri-regular"
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
        <Typography variant="h4">Loading...</Typography>
      )}
    </Container>
  );
};

export default Screen;
