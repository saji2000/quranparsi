import { createContext, useState } from "react";

const QuranContext = createContext();

export const QuranProvider = ({ children }) => {
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearchSubmit = () => {
    setIsSubmitted(true);
  };

  const value = {
    chapter,
    verse,
    isSubmitted,
    setChapter,
    setVerse,
    handleSearchSubmit,
  };

  return (
    <QuranContext.Provider value={value}>{children}</QuranContext.Provider>
  );
};
