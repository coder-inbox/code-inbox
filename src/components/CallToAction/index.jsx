import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/material";

const CallToAction = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: "#0D1549",
        padding: theme.spacing(6, 0),
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={9} sm={12}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontSize: "22px",
                textTransform: "capitalize",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Want to explore the World of Algorithms?
            </Typography>
          </Grid>
          <Grid item md={3} xs={12} sx={{ textAlign: "center" }}>
            <Button
              href="/login"
              sx={{
                margin: "0 auto",
                width: "40%",
                padding: theme.spacing(2),
                borderRadius: "50px",
                fontSize: "16px",
                textTransform: "capitalize",
                color: "#fff",
                fontWeight: 500,
                backgroundColor: theme.palette.primary.main,
                border: "none",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#1A237E",
                  transform: "scale(1.05)",
                },
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction;
