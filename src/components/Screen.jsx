import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  Box, // Importing Box from MUI
} from "@mui/material";

const Screen = () => {
  const theme = useTheme();

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.main,
          display: { xs: "none", sm: "none", md: "block", lg: "block" },
          paddingTop: theme.spacing(12),
        }}
      >
        قرآن پارسی
      </Typography>
    </div>
  );
};

export default Screen;
