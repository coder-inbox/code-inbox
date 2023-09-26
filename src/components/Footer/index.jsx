import React from "react";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import EastIcon from "@mui/icons-material/East";
import { useTheme } from "@mui/material/styles";

const staticData = {
  newsletterText: "Sign up for the Code Inbox newsletter.",
  sections: [
    {
      title: "Newsletter",
      items: [],
    },
    {
      title: "Resources",
      items: [
        { text: "Help Center", link: "/help-center" },
        { text: "Discord", link: "/discord" },
        { text: "Docs", link: "/docs" },
        { text: "Newsletter", link: "/newsletter" },
      ],
    },
    {
      title: "Community",
      items: [
        { text: "Community", link: "/community" },
        { text: "Documentation", link: "/documentation" },
        { text: "Blog", link: "/blog" },
      ],
    },
  ],
};

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,
        alignItems: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(6),
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {staticData.sections.map((section, index) => (
            <Grid key={index} item md={3} sm={6} xs={12}>
              <Box>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  {section.title}
                </Typography>
                <List>
                  {section.title === "Newsletter" ? (
                    <>
                      <ListItem
                        disablePadding
                        sx={{ marginBottom: theme.spacing(11) }}
                      >
                        <Typography
                          variant="body2"
                          component="p"
                          sx={{
                            color: theme.palette.text.secondary,
                            marginTop: theme.spacing(1),
                          }}
                        >
                          {staticData.newsletterText}
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <Paper
                          component="form"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            alignText: "center",
                            width: 200,
                            height: 30,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius,
                          }}
                        >
                          <IconButton
                            sx={{
                              p: theme.spacing(1),
                              color: theme.palette.text.secondary,
                              "&:disabled": {
                                cursor: "default",
                                color: theme.palette.text.secondary,
                              },
                              "&:hover": {
                                color: theme.palette.text.primary,
                              },
                            }}
                            aria-label="menu"
                            disabled
                          >
                            <EmailIcon />
                          </IconButton>
                          <InputBase
                            sx={{
                              ml: 1,
                              flex: 1,
                              fontSize: "12px",
                              color: theme.palette.text.primary,
                            }}
                            placeholder="Enter Your Email..."
                            inputProps={{ "aria-label": "Enter Your Email..." }}
                          />
                          <IconButton
                            type="button"
                            sx={{
                              right: "0px",
                              p: theme.spacing(1),
                              color: theme.palette.common.white,
                              backgroundColor: theme.palette.primary.main,
                              borderRadius: theme.shape.borderRadius,
                              "&:hover": {
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.primary.light,
                              },
                            }}
                          >
                            <EastIcon sx={{ width: 32 }} />
                          </IconButton>
                        </Paper>
                      </ListItem>
                    </>
                  ) : (
                    section.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} disablePadding>
                        <Link
                          sx={{
                            textDecoration: "none",
                            color: theme.palette.text.primary,
                            cursor: "pointer",
                            "&:hover": {
                              color: theme.palette.primary.main,
                            },
                          }}
                          to={item.link}
                        >
                          <ListItemText primary={item.text} />
                        </Link>
                      </ListItem>
                    ))
                  )}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ paddingTop: "20px", paddingBottom: "7px" }}
        >
          <Grid
            container
            spacing={5}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              marginLeft: 12,
            }}
          >
            <Grid item md={3} sm={6} xs={6}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {/*TODO:insert logo here*/}
                <Box component="span" sx={{ width: "140px" }}>
                  2023 &copy; Code Inbox
                </Box>
              </Box>
            </Grid>
            <Grid item md={3} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: { xs: "20px", md: "60px", sm: "60px" },
                  marginRight: { xs: "20px" },
                }}
              >
                <IconButton
                  onClick={() => window.open("", "_self")}
                  sx={{
                    cursor: "pointer",
                    p: "10px",
                    color: "white",
                    backgroundColor: "rgba(60, 63, 63 ,1)",
                    borderRadius: "2px",
                    marginRight: "10px",
                    "&:hover": {
                      cursor: "pointer",
                      color: "#000",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  onClick={() => window.open("", "_self")}
                  sx={{
                    cursor: "pointer",
                    p: "10px",
                    color: "white",
                    backgroundColor: "rgba(60, 63, 63 ,1)",
                    borderRadius: "2px",
                    "&:hover": {
                      cursor: "pointer",
                      color: "#000",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
