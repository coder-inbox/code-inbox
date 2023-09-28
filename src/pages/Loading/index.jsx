import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const Loading = () => {
  const theme = useTheme();

  const keyframes = {
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        animation: `$fadeIn 1s ease-in-out`,
        animationName: keyframes["@keyframes fadeIn"],
      }}
    >
      <CircularProgress color="primary" size={80} />
      <Typography
        variant="h4"
        sx={{
          marginTop: theme.spacing(2),
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
