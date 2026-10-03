import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Colours kept from the original design (cream/tan for light, charcoal for dark)
const palettes = {
  light: {
    mode: "light",
    background: { default: "#f9f7f0", paper: "#fffdf7" },
    // Header / accent surfaces
    secondary: { main: "#d0c7b6", contrastText: "#000000" },
    // Buttons and interactive accents
    primary: { main: "#4285F4", contrastText: "#ffffff" },
    text: { primary: "#000000", secondary: "#424242" },
    divider: "rgba(0, 0, 0, 0.1)",
    verseBadge: "#ece6d8",
  },
  dark: {
    mode: "dark",
    background: { default: "#191919", paper: "#222222" },
    secondary: { main: "#444444", contrastText: "#ffffff" },
    primary: { main: "#037336", contrastText: "#ffffff" },
    text: { primary: "#ffffff", secondary: "#AEAEAE" },
    divider: "rgba(255, 255, 255, 0.12)",
    verseBadge: "#333333",
  },
};

export const getTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: palettes[mode],
      shape: { borderRadius: 12 },
      typography: {
        fontFamily: "'Vazirmatn', system-ui, sans-serif",
        button: { textTransform: "none", fontWeight: 600 },
      },
      components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
        MuiLink: { defaultProps: { underline: "hover", color: "inherit" } },
      },
    })
  );
