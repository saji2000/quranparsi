import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { lightTheme, darkTheme } from "./theme";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  // Checking system preference and setting the default theme (dark or light)
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Navbar toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
