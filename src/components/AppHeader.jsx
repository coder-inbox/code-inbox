import React, { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterType,
  toggleSidebarCollapsed,
} from "@app/store/mailAppReducer/actions";
import { useTheme } from "@mui/material/styles";

const AppHeader = ({ viewMode, handleViewModeChange }) => {
  const dispatch = useDispatch();
  const { filterType } = useSelector(({ mailApp }) => mailApp);
  const { searchText } = filterType;
  const [showViewModes, setShowViewModes] = useState(null);
  const [searchTextState, setSearchTextState] = useState(searchText);

  const theme = useTheme();

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
        <IconButton onClick={() => dispatch(toggleSidebarCollapsed)}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h1"
          component="div"
          sx={{
            color: theme.palette.text.primary,
            cursor: "pointer",
            [theme.breakpoints.up("sm")]: {
              marginLeft: 8,
            },
          }}
        >
          Messages
        </Typography>
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
        <IconButton onClick={onShowViewModes}>
          <SettingsIcon />
        </IconButton>
        <Popover
          id="Mode-id"
          open={Boolean(showViewModes)}
          anchorEl={showViewModes}
          onClose={onHideViewModes}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <RadioGroup
            sx={{ paddingTop: 2, paddingBottom: 2 }}
            aria-label="gender"
            name="gender1"
            value={viewMode}
            onChange={(e) => handleViewModeChange(e.target.value)}
          >
            <FormControlLabel
              value="compact"
              control={<Radio />}
              label="Compact Mode"
            />
            <FormControlLabel
              value="detail"
              control={<Radio />}
              label="Detail Mode"
            />
          </RadioGroup>
        </Popover>
      </Box>
    </Box>
  );
};

export default AppHeader;
