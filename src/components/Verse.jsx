import { useState, useContext } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { digitsEnToFa } from "persian-tools";
import { QuranContext } from "../context/QuranContext";

const Verse = ({ verse, chapter }) => {
  const { showArabic } = useContext(QuranContext);
  const [showFootnote, setShowFootnote] = useState(false);
  const number = digitsEnToFa(String(verse.verse_num));

  return (
    <>
      {/* Section subtitle (English, as in the source translation) */}
      {verse.subtitle && (
        <Typography
          dir="ltr"
          align="center"
          variant="subtitle1"
          color="text.secondary"
          sx={{ fontStyle: "italic", mt: 4, mb: 2 }}
        >
          {verse.subtitle}
        </Typography>
      )}

      <Box
        component="article"
        id={`verse-${verse.verse_num}`}
        sx={{
          // Leave room for the sticky header when scrolled into view
          scrollMarginTop: { xs: 72, sm: 80 },
          py: { xs: 2.5, sm: 3 },
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {/* Verse reference badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1.75,
            height: { xs: 34, sm: 38 },
            borderRadius: 999,
            bgcolor: "verseBadge",
            color: "text.secondary",
            fontSize: { xs: 18, sm: 20 },
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          {digitsEnToFa(String(chapter))}:{number}
        </Box>

        {/* Arabic text, only when turned on in the navbar. Same size as the
            Persian so it never reads larger */}
        {showArabic && (
          <Typography
            className="amiri-regular"
            dir="rtl"
            sx={{ fontSize: { xs: 22, sm: 25 }, fontWeight: 400, lineHeight: 2, mb: 1.5 }}
          >
            {verse.arabic_text}
          </Typography>
        )}

        {/* Persian text */}
        <Typography dir="rtl" sx={{ fontSize: { xs: 22, sm: 25 }, lineHeight: 2 }}>
          {verse.persian_text}
        </Typography>

        {/* Footnote */}
        {verse.footnote && (
          <>
            <Button
              size="small"
              color="inherit"
              onClick={() => setShowFootnote(!showFootnote)}
              endIcon={
                <ExpandMore
                  sx={{
                    transition: "transform 0.2s",
                    transform: showFootnote ? "rotate(180deg)" : "none",
                  }}
                />
              }
              sx={{ mt: 1, color: "text.secondary", px: 1 }}
            >
              پانویس
            </Button>
            <Collapse in={showFootnote}>
              <Typography
                dir="ltr"
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  whiteSpace: "pre-line",
                  lineHeight: 1.7,
                }}
              >
                {verse.footnote}
              </Typography>
            </Collapse>
          </>
        )}
      </Box>
    </>
  );
};

export default Verse;
