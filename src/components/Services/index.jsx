import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import HeadsetIcon from "@mui/icons-material/Headset";

import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SchoolIcon from "@mui/icons-material/School";

const Services = () => {
  const theme = useTheme();

  const howItWorksData = {
    title: "🛠️ How It Works?",
    description:
      "Learn how our platform operates and delivers scheduled algorithm insights to registered users.",
    services: [
      {
        icon: <VerifiedUserIcon fontSize="large" />,
        heading: "User Registration",
        description:
          "Start by registering as a user on our platform to access scheduled algorithm insights.",
      },
      {
        icon: <EmailIcon fontSize="large" />,
        heading: "Scheduled Algorithm Emails",
        description:
          "After registration, subscribe to receive scheduled algorithm insights delivered to your inbox.",
      },
      {
        icon: <SchoolIcon fontSize="large" />,
        heading: "Algorithm Learning",
        description:
          "Explore in-depth explanations, code samples, and practical insights about various algorithms.",
      },
    ],
  };

  return (
    <Box
      id="services"
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10),
      }}
    >
      <Container>
        <Grid
          container
          justifyContent="center"
          sx={{ marginBottom: theme.spacing(30) }}
        >
          <Grid item xs={12} md={10} lg={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h1" sx={{ marginBottom: theme.spacing(20) }}>
                {howItWorksData.title}
              </Typography>
              <Typography variant="body1">
                {howItWorksData.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          {howItWorksData.services.map((service, index) => (
            <Grid item xs={12} lg={4} sx={{ marginBottom: "30px" }} key={index}>
              <Box
                sx={{
                  cursor: "pointer",
                  padding: "50px",
                  textAlign: "center",
                  borderRadius: "6px",
                  transition: "all 0.01s",
                  transform: "translateY(0)",
                  "&:hover": {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.primary.main,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    width: "80px",
                    height: "80px",
                    fontSize: "40px",
                    lineHeight: "80px",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "50%",
                    transition: "all 0.3s",
                    backgroundColor: theme.palette.primary.main,
                    "&:before": {
                      lineHeight: "80px",
                    },
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{ margin: "25px 0 15px", transition: "all 0.3s" }}
                >
                  {service.heading}
                </Typography>
                <Typography variant="body1" sx={{ transition: "all 0.3s" }}>
                  {service.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
