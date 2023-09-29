import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import GroupIcon from "@mui/icons-material/Group";
import ListItemIcon from "@mui/material/ListItemIcon";

const featuresData = {
  title: "⭐ Features",
  description: "Explore the amazing features that make our website stand out.",
  features: [
    {
      icon: (
        <EmailIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "Daily Algorithm Insights",
      description:
        "Receive a new algorithm to learn every day with clear explanations and code samples.",
    },
    {
      icon: (
        <EmojiObjectsIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "In-depth Algorithm Learning",
      description:
        "Get comprehensive insights into algorithms and learn how they work step by step.",
    },
    {
      icon: (
        <CodeIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "Practical Code Samples",
      description:
        "Explore practical code examples that demonstrate the implementation of algorithms.",
    },
    {
      icon: (
        <AccountBalanceIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "Interactive Learning",
      description:
        "Engage with interactive tutorials and quizzes to reinforce your algorithmic knowledge.",
    },
    {
      icon: (
        <BubbleChartIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "Algorithm Visualization",
      description: "Explore algorithms in action with animations and diagrams.",
    },
    {
      icon: (
        <GroupIcon
          sx={{
            width: "40px",
            fontSize: "40px",
            lineHeight: "40px",
          }}
        />
      ),
      heading: "Community Support",
      description:
        "Connect with a vibrant community of learners and experts for help and collaboration.",
    },
  ],
};

const Features = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        id="features"
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
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
                <Typography
                  variant="h1"
                  sx={{ marginBottom: theme.spacing(20) }}
                >
                  {featuresData.title}
                </Typography>
                <Typography variant="body1">
                  {featuresData.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <List
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                {featuresData.features.slice(0, 3).map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      listStyle: "none",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      padding: "8px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2196F3",
                        color: "#fff",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        marginRight: "20px",
                        display: "inline-block",
                        width: "80px",
                        height: "80px",
                        fontSize: "40px",
                        lineHeight: "95px",
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
                      {feature.icon}
                    </ListItemIcon>

                    <Box
                      sx={{
                        transition: "all 0.3s",
                      }}
                    >
                      <Typography variant="h4">{feature.heading}</Typography>
                      <Typography variant="body1">
                        {feature.description}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{
                display: { xs: "none", lg: "block" },
              }}
            >
              <Box>
                <img src="/features.png" alt="Code Inbox Features" height="800px" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <List
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                {featuresData.features.slice(3, 6).map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      listStyle: "none",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      padding: "8px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#2196F3",
                        color: "#fff",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        marginRight: "20px",
                        display: "inline-block",
                        width: "80px",
                        height: "80px",
                        fontSize: "40px",
                        lineHeight: "95px",
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
                      {feature.icon}
                    </ListItemIcon>
                    <Box
                      sx={{
                        transition: "all 0.3s",
                      }}
                    >
                      <Typography variant="h4">{feature.heading}</Typography>
                      <Typography variant="body1">
                        {feature.description}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Features;
