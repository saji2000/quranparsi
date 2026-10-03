import { useEffect, useContext } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { digitsEnToFa } from "persian-tools";
import Verse from "./Verse";
import { QuranContext } from "../context/QuranContext";
import { getChapter, versesByChapter } from "../data/quran";

const Screen = () => {
  const { chapter, verse, jumpId, goTo } = useContext(QuranContext);
  const title = getChapter(chapter);
  const verses = versesByChapter[chapter] || [];
  const basmala = verses.find((v) => v.verse_num === 0);
  const numbered = verses.filter((v) => v.verse_num > 0);

  // Scroll to the selected verse after every navigation (and on first load)
  useEffect(() => {
    const target = document.getElementById(`verse-${verse}`);
    if (verse > 1 && target) {
      target.scrollIntoView({ behavior: jumpId ? "smooth" : "auto", block: "start" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [chapter, verse, jumpId]);

  if (!title) {
    return (
      <Typography align="center" sx={{ py: 8, flexGrow: 1 }}>
        این سوره موجود نیست
      </Typography>
    );
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ flexGrow: 1, px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 4 } }}
    >
      {/* Chapter header */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 3, sm: 4 },
          px: 2,
          mb: 3,
          borderRadius: "20px",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          سوره {digitsEnToFa(String(chapter))} · {digitsEnToFa(String(title.verseCount))} آیه
        </Typography>
        <Typography
          className="amiri-regular"
          component="h1"
          sx={{ fontSize: { xs: 40, sm: 52 }, lineHeight: 1.6 }}
        >
          {title.chapter_title_arabic}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {title.chapter_title_persian}
        </Typography>

        {basmala && (
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
            <Typography className="amiri-regular" sx={{ fontSize: { xs: 26, sm: 30 } }}>
              {basmala.arabic_text}
            </Typography>
            <Typography color="text.secondary">{basmala.persian_text}</Typography>
          </Box>
        )}
      </Box>

      {/* Verses */}
      {numbered.map((v) => (
        <Verse key={v.verse_num} verse={v} chapter={chapter} />
      ))}

      {/* Previous / next chapter */}
      <Box sx={{ display: "flex", gap: 1.5, mt: 4 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          disabled={chapter <= 1}
          onClick={() => goTo(chapter - 1)}
          startIcon={<ChevronRight />}
          sx={{ py: 1.5, borderColor: "divider" }}
        >
          سوره قبلی
        </Button>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={chapter >= 114}
          onClick={() => goTo(chapter + 1)}
          endIcon={<ChevronLeft />}
          sx={{ py: 1.5 }}
        >
          سوره بعدی
        </Button>
      </Box>
    </Container>
  );
};

export default Screen;
