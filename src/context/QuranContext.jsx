import { createContext, useState } from "react";

export const QuranContext = createContext();

export const QuranProvider = ({ children }) => {
  const [chapter, setChapter] = useState(
    window.localStorage.getItem("chapter") || 1
  );
  const [verse, setVerse] = useState(window.localStorage.getItem("verse") || 1);

  const value = {
    chapter,
    verse,
    setChapter,
    setVerse,
  };

  return (
    <QuranContext.Provider value={value}>{children}</QuranContext.Provider>
  );
};
