const lightTheme = {
  palette: {
    primary: {
      main: "#f9f7f0",
    },
    secondary: {
      main: "#d0c7b6",
    },
    text: {
      main: "#000000",
      secondary: "#424242",
    },
    button: {
      main: "#4285F4",
    },
  },
  components: {
    MuiLink: {
      // Customize the default Link component
      styleOverrides: {
        root: {
          color: "black", // Default link color will be black
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: "#191919",
    },
    secondary: {
      main: "#393939",
    },
    text: {
      main: "#ffffff",
      secondary: "#AEAEAE",
    },
    button: {
      main: "#037336",
    },
  },
  components: {
    MuiLink: {
      // Customize the default Link component
      styleOverrides: {
        root: {
          color: "black", // Default link color will be black
        },
      },
    },
  },
};

export { lightTheme, darkTheme };
