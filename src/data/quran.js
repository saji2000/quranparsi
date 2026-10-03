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
