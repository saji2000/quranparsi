import { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Screen from "./components/Screen";
import Footer from "./components/Footer";
import { QuranProvider } from "./context/QuranContext";
import { getTheme } from "./theme";
import "./App.css";

const systemMode = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

function App() {
  // The user's saved choice wins over the system preference
  const [mode, setMode] = useState(
    () => window.localStorage.getItem("theme") || systemMode()
  );

  // Follow system changes only while the user hasn't picked a theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!window.localStorage.getItem("theme")) {
        setMode(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Keep the browser chrome (mobile address bar) in sync with the header
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme.palette.secondary.main);
  }, [theme]);

  const toggleTheme = () => {
    const next = mode === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    setMode(next);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuranProvider>
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          <Navbar mode={mode} toggleTheme={toggleTheme} />
          <Screen />
          <Footer />
        </Box>
      </QuranProvider>
    </ThemeProvider>
  );
}

export default App;
