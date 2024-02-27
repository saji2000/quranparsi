import { useEffect, useState, useContext } from "react";
import { QuranContext } from "../context/QuranContext";
import data from "../data/translation.json";
import { Typography, useTheme, Box, Container, Divider } from "@mui/material";

const Screen = () => {
  const { chapter, verse } = useContext(QuranContext);
  const [verses, setVerses] = useState([]);
  useEffect(() => {
    setVerses(data.filter((d) => d["sura_num"] == chapter));
  }, [chapter]);

  const theme = useTheme();

  // const context = useContext(QuranProvider);

  // const [currentChapter, setCurrentChapter] = useState(1); // Start with chapter 1

  // const fetchData = async (filePath) => {
  //   try {
  //     const response = await fetch(filePath);
  //     if (!response.ok) {
  //       throw new Error(`Error fetching data: ${response.status}`);
  //     }
  //     console.log("response:", response);

  //     const data = await response.json();
  //     console.log("data:", data);

  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const filePath = `../data/quran_chapters/chapter_${currentChapter}.json`;
  //   fetchData(filePath)
  //     .then((data) => setVerses(data))
  //     .catch((error) => console.log(error));
  // }, [currentChapter]);

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
      {/* {console.log("verses:", verses)} */}
      {verses.length > 0 ? (
        verses.map((verse) => (
          <Box key={verse.verse_num} sx={{ marginBottom: theme.spacing(2) }}>
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
