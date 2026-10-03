import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 3,
        paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary" dir="ltr">
        Sajad • © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
