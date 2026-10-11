import { Box } from "@mui/material";
import { hasSameTitles } from "../data/quran";

// Persian and Arabic chapter titles side by side at the same size and
// weight, or just the Persian one when they're the same word
const ChapterName = ({ chapter }) => (
  <>
    {chapter.chapter_title_persian}
    {!hasSameTitles(chapter) && (
      <>
        {" · "}
        <Box component="span" className="amiri-regular" sx={{ fontWeight: "inherit" }}>
          {chapter.chapter_title_arabic}
        </Box>
      </>
    )}
  </>
);

export default ChapterName;
