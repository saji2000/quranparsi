import { useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { digitsEnToFa, digitsFaToEn } from "persian-tools";
import { QuranContext } from "../context/QuranContext";
import { chapters, getChapter } from "../data/quran";

// Keeps only digits (Latin or Persian) and returns them as Latin digits
const toNumberInput = (value) =>
  digitsFaToEn(value.replace(/[^0-9۰-۹]/g, "")) || "";

const numericInputProps = {
  inputMode: "numeric",
  pattern: "[0-9۰-۹]*",
  style: { textAlign: "center" },
};

const ChapterPicker = ({ open, onClose }) => {
  const { chapter, goTo } = useContext(QuranContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [query, setQuery] = useState("");
  const [chapterInput, setChapterInput] = useState("");
  const [verseInput, setVerseInput] = useState("");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = (digitsFaToEn(query.trim()) || "").toLowerCase();
    if (!q) return chapters;
    return chapters.filter(
      (c) =>
        String(c.chapter_number) === q ||
        c.chapter_title_persian.includes(q) ||
        c.chapter_title_arabic.includes(q) ||
        c.chapter_title_english.toLowerCase().includes(q)
    );
  }, [query]);

  const navigate = (newChapter, newVerse) => {
    goTo(newChapter, newVerse);
    setError("");
    onClose();
  };

  // Jump straight to a chapter:verse typed by the user
  const onSubmit = (event) => {
    event.preventDefault();
    const c = parseInt(chapterInput || chapter, 10);
    const v = parseInt(verseInput || 1, 10);
    const target = getChapter(c);
    if (!target) {
      setError("این سوره موجود نیست");
    } else if (v < 1 || v > target.verseCount) {
      setError(
        `سوره ${target.chapter_title_persian} ${digitsEnToFa(
          String(target.verseCount)
        )} آیه دارد`
      );
    } else {
      navigate(c, v);
    }
  };

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        dir: "rtl",
        sx: {
          width: isMobile ? "100%" : 420,
          height: isMobile ? "85dvh" : "100%",
          borderTopLeftRadius: isMobile ? 20 : 0,
          borderTopRightRadius: isMobile ? 20 : 0,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom)",
        },
      }}
    >
      {/* Grab handle on mobile */}
      {isMobile && (
        <Box
          sx={{
            width: 40,
            height: 4,
            borderRadius: 2,
            bgcolor: "text.secondary",
            opacity: 0.4,
            mx: "auto",
            mt: 1,
          }}
        />
      )}

      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            رفتن به سوره و آیه
          </Typography>
          <IconButton onClick={onClose} aria-label="بستن" edge="end">
            <Close />
          </IconButton>
        </Box>

        {/* Direct chapter:verse jump */}
        <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="سوره"
            value={chapterInput}
            onChange={(e) => setChapterInput(toNumberInput(e.target.value))}
            inputProps={{ ...numericInputProps, "aria-label": "شماره سوره" }}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            placeholder="آیه"
            value={verseInput}
            onChange={(e) => setVerseInput(toNumberInput(e.target.value))}
            inputProps={{ ...numericInputProps, "aria-label": "شماره آیه" }}
            sx={{ flex: 1 }}
          />
          <Button type="submit" variant="contained" disableElevation sx={{ px: 3 }}>
            برو
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* Chapter search */}
        <TextField
          fullWidth
          size="small"
          placeholder="جستجوی نام یا شماره سوره"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Chapter list */}
      <List sx={{ overflowY: "auto", flexGrow: 1, px: 1, pt: 0 }}>
        {filtered.map((c) => (
          <ListItemButton
            key={c.chapter_number}
            selected={c.chapter_number === Number(chapter)}
            onClick={() => navigate(c.chapter_number, 1)}
            sx={{ borderRadius: 2, gap: 1.5, py: 1 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                display: "grid",
                placeItems: "center",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {digitsEnToFa(String(c.chapter_number))}
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600 }} noWrap>
                {c.chapter_title_persian}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {digitsEnToFa(String(c.verseCount))} آیه
              </Typography>
            </Box>
            <Typography className="amiri-regular" sx={{ fontSize: 20 }}>
              {c.chapter_title_arabic}
            </Typography>
          </ListItemButton>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            سوره‌ای پیدا نشد
          </Typography>
        )}
      </List>
    </Drawer>
  );
};

export default ChapterPicker;
