import { useEffect, useState, useContext } from "react";
import { QuranContext } from "../context/QuranContext";
import data from "../data/translation.json";
import titles from "../data/titles.json";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";
import { digitsEnToFa } from "persian-tools";

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

  // useEffect(() => {
  //   if (verse && document.getElementById(verse)) {
  //     getElementById(verse).scrollIntoView({
  //       behaviour: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [verse]);

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
            >{`(${digitsEnToFa(chapter.toString())}:${digitsEnToFa(
              verse.verse_num.toString()
            )}) ${verse.arabic_text}`}</Typography>
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
