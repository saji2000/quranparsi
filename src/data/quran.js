import translation from "./translation.json";
import titles from "./titles.json";

// Verses grouped by chapter number. Verse 0 is the unnumbered opening Basmala.
export const versesByChapter = translation.reduce((acc, verse) => {
  (acc[verse.sura_num] ||= []).push(verse);
  return acc;
}, {});

export const chapters = titles.map((title) => ({
  ...title,
  verseCount: versesByChapter[title.chapter_number].filter(
    (v) => v.verse_num > 0
  ).length,
}));

export const getChapter = (number) => chapters[number - 1];

// Arabic and Persian spellings differ only in a few letters and marks
const normalize = (text) =>
  text
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/[\s\u200c]+/g, "");

// True when the Arabic and Persian titles are the same word, so only one
// needs showing
export const hasSameTitles = (chapter) =>
  normalize(chapter.chapter_title_arabic) ===
  normalize(chapter.chapter_title_persian);
