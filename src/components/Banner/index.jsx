import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CodeIcon from "@mui/icons-material/Code";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const heroData = {
    paragraphs: [
      "Discover a new algorithm every day with our intuitive learning platform.",
      " Get comprehensive explanations and real-world code examples for each algorithm.",
    ],
    features: [
      {
        icon: (
          <EmailIcon
            sx={{
              float: "left",
              display: "block",
              padding: theme.spacing(2),
              background: "green",
              color: "#fff",
              borderRadius: "50%",
              marginRight: theme.spacing(2),
              fontSize: "20px",
            }}
          />
        ),
        text: "Daily Algorithm Insights",
      },
      {
        icon: (
          <EmojiObjectsIcon
            fontSize="large"
            sx={{
              float: "left",
              display: "block",
              padding: theme.spacing(2),
              background: "blue",
              color: "#fff",
              borderRadius: "50%",
              marginRight: theme.spacing(2),
              fontSize: "20px",
            }}
          />
        ),
        text: "In-depth Algorithm Learning",
      },
      {
        icon: (
          <CodeIcon
            fontSize="large"
            sx={{
              float: "left",
              display: "block",
              padding: theme.spacing(2),
              background: "grey",
              color: "#fff",
              borderRadius: "50%",
              marginRight: theme.spacing(2),
              fontSize: "20px",
            }}
          />
        ),
        text: "Practical Code Samples",
      },
    ],
  };

  return (
    <Box
      id="banner"
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
        paddingTop: theme.spacing(50),
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Box
              sx={{
                margin: theme.spacing(5, 0),
                "& h2": {
                  fontSize: "40px",
                  fontWeight: 600,
                },
                "& p": {
                  fontSize: "16px",
                  padding: theme.spacing(4, 0),
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  margin: theme.spacing(10, 0),
                }}
              >
                Unlock the World of Algorithms
              </Typography>
              <Typography variant="p">{heroData.paragraphs}</Typography>
            </Box>
            <Box>
              <List>
                {heroData.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon key={index}>{feature.icon}</ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "16px",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {feature.text}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  margin: theme.spacing(10, 0),
                  display: "inline-block",
                  padding: theme.spacing(2, 12),
                  borderRadius: "10px",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  color: theme.palette.primary.main,
                  backgroundColor: "transparent",
                  border: `2px solid ${theme.palette.primary.main}`,
                  fontWeight: 600,
                  letterSpacing: "1px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    transform: "scale(1.05)",
                  },
                  "&::after": {
                    position: "absolute",
                    content: '"\\f061"',
                    fontFamily: "fontawesome",
                    fontSize: "12px",
                    right: theme.spacing(4),
                    top: "50%",
                    transform: "translateY(-50%)",
                  },
                }}
              >
                Try It Out
              </Button>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                "& img": {
                  width: "100%",
                },
              }}
            >
              <img src="/banner.png" alt="" />
            </Box>
          </Grid>
        </Grid>
        <Grid container data-scroll-index="1">
          {/* Place the code for counters here */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
