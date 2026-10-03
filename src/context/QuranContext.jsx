import { createContext, useState } from "react";

export const QuranContext = createContext();

const readNumber = (key) => parseInt(window.localStorage.getItem(key), 10) || 1;

// Quran Context Provider for the chapter and verse number
export const QuranProvider = ({ children }) => {
  const [chapter, setChapter] = useState(() => readNumber("chapter"));
  const [verse, setVerse] = useState(() => readNumber("verse"));
  // Bumped on every navigation so jumping to the same verse scrolls again
  const [jumpId, setJumpId] = useState(0);

  // Moves to a chapter/verse and remembers it for the next visit
  const goTo = (newChapter, newVerse = 1) => {
    setChapter(newChapter);
    setVerse(newVerse);
    setJumpId((id) => id + 1);
    window.localStorage.setItem("chapter", newChapter);
    window.localStorage.setItem("verse", newVerse);
  };

  const value = { chapter, verse, jumpId, goTo };

  return (
    <QuranContext.Provider value={value}>{children}</QuranContext.Provider>
  );
};
