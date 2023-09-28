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
import Link from "@mui/material/Link";

const Team = () => {
  const theme = useTheme();

  return (
    <Box
      id="team"
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10),
      }}
    >
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h1" sx={{ marginBottom: theme.spacing(10) }}>
                👷 Our Team
              </Typography>
              <Typography variant="body1 ">
                Connect with our expert team!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} md={3}>
            <Box
              sx={{
                border: "2px solid transparent",
                textAlign: "center",
                cursor: "pointer",
                padding: "40px",
                borderRadius: "10px",
                textTransform: "capitalize",
                marginTop: "50px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  border: "2px solid transparent",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "120px",
                  height: "120px",
                  margin: "0 auto",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <img
                  src="https://pbs.twimg.com/profile_images/1670824069271367680/H4TZWgcZ_400x400.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography variant="h4" style={{ marginTop: "15px" }}>
                Mahmoud Harmouch
              </Typography>
              <Typography variant="body1">Founder & CEO</Typography>
              <Box
                sx={{
                  border: "2px solid transparent",
                  margin: "15px auto 0 auto",
                  background: "#E7E9FF",
                  borderRadius: "30px",
                  width: "110px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <List
                  sx={{ display: "flex", alignItems: "center", gap: "1px" }}
                >
                  <ListItem>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://twitter.com/wiseaidev"}
                    >
                      <TwitterIcon
                        sx={{
                          color: "#63688E",
                          fontSize: "26px",
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://www.linkedin.com/in/mahmoud-harmouch"}
                    >
                      <LinkedInIcon
                        sx={{
                          color: "#63688E",
                          fontSize: "26px",
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      />
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
