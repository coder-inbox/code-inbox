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
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  setFilterType,
  toggleSidebarCollapsed,
} from "@app/store/mailAppReducer/actions";
import { uploadPicture, userLogout } from "@app/store/authReducer/actions";
import { useTheme } from "@mui/material/styles";

import { toggleTheme } from "@app/store/authReducer";
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

import ProfileDetail from "@app/components/ProfileDetail";
import CustomAvatar from "@app/components/CustomAvatar";
import EditInfo from "@app/components/EditInfo";
import { useNavigate } from "react-router-dom";

import { useDropzone } from "react-dropzone";

import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "@app/components/Header/ScrollToTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { getMailsList } from "@app/store/mailAppReducer/actions";
const sections = ["Banner", "Features", "Services", "Team", "Faq"];
const settings = ["View Profile", "Edit Profile", "Log out"];

const AppHeader = ({ viewMode, handleViewModeChange }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [disableLoader, setDisableLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [edit, setEdit] = useState(false);
  const { loading, currentUser, error } = useSelector((state) => state.auth);
  const [currentAuthUser, setCurrentAuthUser] = useState(currentUser);

  const { filterType } = useSelector(({ mailApp }) => mailApp);
  const { searchText } = filterType;
  const [showViewModes, setShowViewModes] = useState(null);
  const [searchTextState, setSearchTextState] = useState(searchText);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const onShowViewModes = (event) => {
    setShowViewModes(event.currentTarget);
  };

  const onHideViewModes = () => {
    setShowViewModes(null);
  };
  const handleRefreshClick = () => {
    dispatch(getMailsList());
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
    dispatch(toggleTheme(newTheme));
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
    setAnchorElUser(null);
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
        dispatch(userLogout());
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
      dispatch(uploadPicture(files[0]));
    },
  });

  useEffect(() => {
    setCurrentAuthUser(JSON.parse(localStorage.getItem("user")));
    setDisableLoader(false);
    // eslint-disable-next-line
  }, []);
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        backgroundColor: theme.palette.background.default,
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
          <MenuIcon sx={{ color: theme.palette.text.primary }} />
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
            color: theme.palette.text.primary,
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
              border: `1px solid ${theme.palette.text.primary}`,
              fontSize: "12px",
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
          {darkTheme ? (
            <Brightness4Icon sx={{ color: theme.palette.text.primary }} />
          ) : (
            <Brightness7Icon sx={{ color: theme.palette.text.primary }} />
          )}
        </IconButton>
        <IconButton color="primary" onClick={handleRefreshClick}>
          <RefreshIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ ml: 7 }}>
              <CustomAvatar
                alt="user name"
                src={currentAuthUser?.profile_picture}
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
            <Box
              p={{
                xs: 2,
                md: 3,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Box className="user-root">
                <input {...getInputProps()} />
                <IconButton className="icon-btn-root" {...getRootProps()}>
                  <CustomAvatar
                    src={
                      currentAuthUser?.profile_picture
                        ? currentAuthUser?.profile_picture
                        : ""
                    }
                  />
                </IconButton>
                <Box className="custom-user-info">
                  <Typography
                    className="user-title"
                    component="h3"
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    {currentAuthUser?.full_name
                      ? currentAuthUser?.full_name
                      : ""}
                  </Typography>
                  <Typography
                    className="user-sub-title"
                    component="span"
                    sx={{
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
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
      <EditInfo open={edit} onCloseDialog={handleEditClose} />
    </Box>
  );
};

export default AppHeader;
