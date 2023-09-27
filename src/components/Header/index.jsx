import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CustomElevator from "./CustomElevator";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

import Popover from "@mui/material/Popover";

import ProfileDetail from "../ProfileDetail";
import CustomAvatar from "../CustomAvatar";
import { useNavigate } from "react-router-dom";

import { useDropzone } from "react-dropzone";

import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const sections = ["Banner", "Features", "Services", "Team", "Faq"];
const settings = ["View Profile", "Edit Profile", "Log out"];

function Header(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [disableLoader, setDisableLoader] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [edit, setEdit] = React.useState(false);
  const { loading, currentUser, error } = useSelector((state) => state.auth);
  const [currentAuthUser, setCurrentAuthUser] = React.useState(currentUser);

  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  const toggleDarkTheme = () => {
    const newTheme = darkTheme ? "light" : "dark";
    setDarkTheme(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogInClick = (event) => {
    setDisableLoader(true);
    navigate("/login");
  };
  const handleCreateClick = (event) => {
    navigate("/mail");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleEditClose = () => {
    setEdit(false);
  };
  const handleUserMenuClick = (index) => {
    switch (index) {
      case 0:
        setAnchorEl("value");
        break;
      case 1:
        setEdit(true);
        break;
      case 2:
        navigate("/mail");
        break;
      case 3:
        localStorage.clear();
        navigate("/");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };
  const handleUserMenuClose = (event) => {
    setAnchorElUser(null);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (files) => {
      // TODO: dispatch(uploadPicture(files[0]));
    },
  });

  useEffect(() => {
    setCurrentAuthUser(JSON.parse(localStorage.getItem("user")));
    setDisableLoader(false);
    // eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return (
    <Box component="header">
      <Container maxWidth="lg">
        <CustomElevator {...props}>
          <AppBar
            sx={{
              alignItems: currentAuthUser ? "right" : "center",
              justifyContent: "",
              color: theme.palette.primary.main,
              backgroundColor: "rgba(33,36,40,1)",
            }}
          >
            <Toolbar id="back-to-top-anchor">
              {/*logo here*/}
              <Typography
                variant="h6"
                noWrap
                onClick={() => navigate("/")}
                sx={{
                  mr: 2,
                  cursor: "pointer",
                  display: { md: "flex" },
                  fontFamily: "sans",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "#fff",
                  textDecoration: "none",

                  textTransform: "uppercase",
                }}
              >
                Code Inbox
              </Typography>
              {!currentAuthUser ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    ml: "400px",
                  }}
                >
                  {sections.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link
                        underline="none"
                        color="inherit"
                        href={`#${page}`.toLowerCase()}
                        sx={{
                          fontWeight: 700,
                          "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.main,
                            textDecoration: "none",
                            borderBottomWidth: "100%",
                            borderBottomStyle: "solid",
                            paddingBottom: "1px",
                            listStyleType: "none",
                            position: "relative",
                            bottom: "4px",
                          },
                        }}
                      >
                        {page}
                      </Link>
                    </Button>
                  ))}
                </Box>
              ) : null}

              <IconButton
                onClick={toggleDarkTheme}
                sx={{
                  ml: 2,
                  color: "white",
                }}
                aria-label="Toggle theme"
              >
                {darkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              {currentAuthUser ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ ml: 20 }}>
                      <Avatar
                        alt="user name"
                        src={currentAuthUser?.author_avatar}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleUserMenuClose}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleUserMenuClick(index)}
                        sx={{
                          backgroundColor: "rgba(33,36,40,1)",
                          color: theme.palette.primary.main,
                          color: "white",
                          fontWeight: 800,
                          "&:hover": {
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                            textDecoration: "none",
                            borderBottomWidth: "100%",
                            borderBottomStyle: "solid",
                            paddingBottom: "1px",
                            listStyleType: "none",
                            position: "relative",
                            bottom: "4px",
                          },
                        }}
                      >
                        <Typography
                          sx={{ textAlign: "center", fontWeight: 800 }}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  <Popover
                    id={"user-popover"}
                    open={Boolean(anchorEl)}
                    className="user-popover"
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Box p={{ xs: 2, md: 3 }}>
                      <Box className="user-root">
                        <input {...getInputProps()} />
                        <IconButton
                          className="icon-btn-root"
                          {...getRootProps()}
                        >
                          <CustomAvatar
                            src={
                              currentAuthUser?.author_avatar
                                ? currentAuthUser?.author_avatar
                                : ""
                            }
                          />
                        </IconButton>
                        <Box className="custom-user-info">
                          <Typography
                            className="user-title"
                            component="h3"
                            variant="h6"
                            sx={{ color: "#fff" }}
                          >
                            {currentAuthUser?.first_name
                              ? currentAuthUser?.first_name
                              : ""}
                          </Typography>
                          <Typography
                            className="user-sub-title"
                            component="span"
                          >
                            {currentAuthUser?.bio
                              ? currentAuthUser?.bio.substring(0, 30) + "..."
                              : ""}
                          </Typography>
                        </Box>
                      </Box>
                      <ProfileDetail
                        currentUser="true"
                        user={currentAuthUser}
                      />
                    </Box>
                  </Popover>
                </Box>
              ) : (
                <Button
                  onClick={handleLogInClick}
                  sx={{
                    right: "0px",
                    color: theme.palette.primary.main,
                    backgroundColor: "transparent",
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: "10px",
                    transition: "all 0.3s ease-in-out",
                    p: "5px",
                    px: "15px",
                    ml: "20px",
                    mr: "10px",
                    fontWeight: 800,
                    "&:hover": {
                      color: "#fff",
                      borderRadius: "10px",
                      backgroundColor: theme.palette.primary.main,
                      boxShadow: `0 0.5em 0.5em -0.4em ${theme.palette.primary.main}`,
                      transform: "translateY(-0.25em)",
                    },
                    "&:disabled": {
                      color: "#fff",
                    },
                  }}
                  disabled={disableLoader}
                >
                  Log In
                </Button>
              )}
              {!currentAuthUser ? (
                <Box sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", sm: "block", md: "none" },
                    }}
                  >
                    {sections.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{
                          padding: "10px 30px",
                          backgroundColor: "rgba(33, 36, 40, 1)",
                          color: "#fff",
                          "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Link
                          underline="none"
                          color="inherit"
                          href={`#${page}`.toLowerCase()}
                          sx={{
                            fontWeight: 700,
                            "&:hover": {
                              cursor: "pointer",
                              color: theme.palette.primary.main,
                              textDecoration: "none",
                              borderBottomWidth: "100%",
                              borderBottomStyle: "solid",
                              paddingBottom: "1px",
                              listStyleType: "none",
                              position: "relative",
                              bottom: "4px",
                            },
                          }}
                        >
                          {page}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : null}
            </Toolbar>
          </AppBar>
        </CustomElevator>
      </Container>
      <ScrollToTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </Box>
  );
}
export default Header;
