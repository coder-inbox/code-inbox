import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import HeaderOptions from "./HeaderOptions";
import {
  nullifySelectedMail,
  updateMailsFolder,
} from "@app/store/mailAppReducer/actions";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alpha, useTheme } from "@mui/material/styles";

const DetailHeader = ({ selectedMail, labelsList }) => {
  const dispatch = useDispatch();
  const [showMoreOptions, setShowMoreOptions] = useState(null);
  const theme = useTheme();

  const onShowMoreOptions = (event) => {
    setShowMoreOptions(event.currentTarget);
  };

  const onHideMoreOptions = () => {
    setShowMoreOptions(null);
  };

  const onGoBack = () => {
    dispatch(nullifySelectedMail());
  };

  const onChangeMailFolder = (folder) => {
    const mail = { ...selectedMail, folder };
    dispatch(updateMailsFolder(mail));
  };

  const onSelectLabel = (label) => {
    const mail = { ...selectedMail };
    const isLabel = mail.labels.some((item) => item === label);
    if (isLabel) {
      mail.labels = mail.labels.filter((item) => item !== label);
    } else {
      mail.labels = mail.labels.concat(label);
    }
    dispatch(updateMailsFolder(mail));
  };

  const onUpdateFvrtStatus = () => {
    const mail = { ...selectedMail, favorite: !selectedMail.starred };
    dispatch(updateMailsFolder(mail));
    onHideMoreOptions();
  };

  const onUpdateImprtntStatus = () => {
    const mail = { ...selectedMail, important: !selectedMail.important };
    dispatch(updateMailsFolder(mail));
    onHideMoreOptions();
  };

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.borderColor.main}`,
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        alignItems: "center",
        padding: "11px 16px 10px 16px",
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "6px",
          paddingRight: "6px",
        },
      }}
    >
      <Tooltip title="Back">
        <IconButton onClick={onGoBack}>
          <ArrowBackIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Tooltip>
      <Box
        ml="auto"
        display="flex"
        alignItems="center"
        sx={{
          "& .borderLeft": {
            width: "1px",
            height: "36px",
            backgroundColor: alpha(theme.palette.common.dark, 0.12),
            marginLeft: "4px",
          },
        }}
      >
        <HeaderOptions
          onChangeMailFolder={onChangeMailFolder}
          onSelectLabel={onSelectLabel}
          labelsList={labelsList}
          selectedMail={selectedMail}
        />
      </Box>
      <Box ml="auto" sx={{ ml: 1 }}>
        <Tooltip title="More Options">
          <IconButton onClick={onShowMoreOptions}>
            <MoreHorizIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={showMoreOptions}
        open={Boolean(showMoreOptions)}
        onClose={onHideMoreOptions}
        sx={{
          color: theme.palette.text.primary,
        }}
      >
        <MenuItem
          onClick={onUpdateFvrtStatus}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {selectedMail.favorite ? "Remove from Favorite" : "Mark as Favorite"}
        </MenuItem>
        <MenuItem
          onClick={onUpdateImprtntStatus}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {selectedMail.important
            ? "Remove from Important"
            : "Mark as Important"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DetailHeader;

DetailHeader.propTypes = {
  selectedMail: PropTypes.object.isRequired,
  labelsList: PropTypes.array.isRequired,
};
