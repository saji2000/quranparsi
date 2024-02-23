import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Screen from "./components/Screen";
import Footer from "./components/Footer";
import { lightTheme, darkTheme } from "./theme";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QuranProvider } from "./context/QuranContext";
import { Container, Box } from "@mui/material";

function App() {
  // Checking system preference and setting the default theme (dark or light)
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
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
      <QuranProvider>
        <Box flex="block">
          <Navbar toggleTheme={toggleTheme} />
          <Screen />
          <Footer />
        </Box>
      </QuranProvider>
    </ThemeProvider>
  );
}

export default App;
