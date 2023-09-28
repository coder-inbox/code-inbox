import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Popover,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputBase,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import {
  setFilterType,
  toggleSidebarCollapsed,
} from "@app/store/mailAppReducer/actions";
import { useTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CustomElevator from "@app/components/Header/CustomElevator";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

import ProfileDetail from "../ProfileDetail";
import CustomAvatar from "../CustomAvatar";
import { useNavigate } from "react-router-dom";

import { useDropzone } from "react-dropzone";

import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "@app/components/Header/ScrollToTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";

const sections = ["Banner", "Features", "Services", "Team", "Faq"];
const settings = ["View Profile", "Edit Profile", "Log out"];

const AppHeader = ({ viewMode, handleViewModeChange }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [disableLoader, setDisableLoader] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [edit, setEdit] = React.useState(false);
  const { loading, currentUser, error } = useSelector((state) => state.auth);
  const [currentAuthUser, setCurrentAuthUser] = React.useState(currentUser);

  const { filterType } = useSelector(({ mailApp }) => mailApp);
  const { searchText } = filterType;
  const [showViewModes, setShowViewModes] = useState(null);
  const [searchTextState, setSearchTextState] = useState(searchText);

  const onShowViewModes = (event) => {
    setShowViewModes(event.currentTarget);
  };

  const onHideViewModes = () => {
    setShowViewModes(null);
  };

  const handleSearchText = (e) => {
    setSearchTextState(e.target.value);
    dispatch(
      setFilterType({
        selectedFolder: !searchTextState && "inbox",
        selectedFilter: "",
        selectedLabel: "",
        searchText: searchTextState,
        page: 0,
      })
    );
  };
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  const toggleDarkTheme = () => {
    const newTheme = darkTheme ? "light" : "dark";
    setDarkTheme(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleConnectClick = (event) => {
    setDisableLoader(true);
    const accountInfo = JSON.parse(localStorage.getItem("user"));
    if (accountInfo) {
      dispatch(userLogin({ email: "test@test.com", password: "test" }));
    } else {
      // TODO: Register user
    }
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
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.up("md")]: {
            width: 256,
          },
        }}
      >
        <IconButton onClick={(e) => handleViewModeChange(e.target.value)}>
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          sx={{
            color: theme.palette.text.primary,
            height: "50px",
            cursor: "pointer",
            [theme.breakpoints.up("sm")]: {
              marginLeft: 8,
            },
          }}
          src="/main-logo.png"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "10px 16px",
          [theme.breakpoints.up("md")]: {
            width: "calc(100% - 256px)",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: 0,
            "& .CmtSearch-input": {
              width: "100%",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <InputBase
            placeholder="Search emails here..."
            inputProps={{ "aria-label": "search" }}
            value={searchTextState}
            onChange={handleSearchText}
            sx={{
              width: "100%",
              padding: "5px 15px 5px 35px",
              height: "36px",
              borderRadius: "4px",
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              fontSize: "12px",
              backgroundColor: theme.palette.background.paper,
              transition: "all 0.3s ease",
              "&:focus": {
                borderColor: theme.palette.text.primary,
              },
            }}
          />
          <SearchIcon
            sx={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: theme.palette.text.primary,
              fontSize: "20px",
              padding: "10px 0",
            }}
          />
        </Box>
        <IconButton
          onClick={toggleDarkTheme}
          sx={{
            ml: 12,
            color: "white",
          }}
          aria-label="Toggle theme"
        >
          {darkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ ml: 7 }}>
              <Avatar alt="user name" src={currentAuthUser?.author_avatar} />
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
                <Typography sx={{ textAlign: "center", fontWeight: 800 }}>
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
                <IconButton className="icon-btn-root" {...getRootProps()}>
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
                  <Typography className="user-sub-title" component="span">
                    {currentAuthUser?.bio
                      ? currentAuthUser?.bio.substring(0, 30) + "..."
                      : ""}
                  </Typography>
                </Box>
              </Box>
              <ProfileDetail currentUser="true" user={currentAuthUser} />
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;
