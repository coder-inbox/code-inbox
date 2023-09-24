import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import LabelIcon from "@mui/icons-material/Label";
import FolderIcon from "@mui/icons-material/Folder";
import ReportIcon from "@mui/icons-material/Report";
import Hidden from "@mui/material/Hidden";

const folderList = [
  { id: 1, name: "Inbox", slug: "inbox", icon: <MoveToInboxIcon /> },
  { id: 2, name: "Sent", slug: "sent", icon: <SendIcon /> },
  { id: 3, name: "Drafts", slug: "drafts", icon: <DraftsIcon /> },
  { id: 5, name: "Spam", slug: "spam", icon: <ReportIcon /> },
  { id: 6, name: "Trash", slug: "trash", icon: <DeleteIcon /> },
  { id: 7, name: "Archived", slug: "archived", icon: <ArchiveIcon /> },
];

const HeaderOptions = ({ onChangeMailFolder, onSelectLabel, labelsList }) => {
  const [showLabels, setShowLabels] = useState(null);
  const [showFolders, setShowFolders] = useState(null);
  const theme = useTheme();

  const onShowLabels = (event) => {
    setShowLabels(event.currentTarget);
  };

  const onHideLabels = () => {
    setShowLabels(null);
  };

  const onShowFolders = (event) => {
    setShowFolders(event.currentTarget);
  };

  const onHideFolders = () => {
    setShowFolders(null);
  };

  const onClickLabelOption = (label) => {
    onSelectLabel(label.id);
    onHideLabels();
  };

  const onClickFolderOption = (folder) => {
    onChangeMailFolder(folder.slug);
    onHideFolders();
  };

  return (
    <>
      <Hidden xsDown>
        <Box ml={1}>
          <Tooltip title="Report Spam">
            <IconButton
              onClick={() => onChangeMailFolder("spam")}
              sx={{ padding: 6 }}
            >
              <ReportIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box ml={1}>
          <Tooltip title="Archive">
            <IconButton
              onClick={() => onChangeMailFolder("archived")}
              sx={{ padding: 6 }}
            >
              <ArchiveIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box ml={1}>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => onChangeMailFolder("trash")}
              sx={{ padding: 6 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            width: 1,
            height: 36,
            backgroundColor: alpha(theme.palette.common.dark, 0.12),
            marginLeft: 4,
          }}
        />
      </Hidden>

      <Box ml={1}>
        <Tooltip title="Labels">
          <IconButton sx={{ padding: 6 }} onClick={onShowLabels}>
            <LabelIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={showLabels}
        open={Boolean(showLabels)}
        onClose={onHideLabels}
      >
        {labelsList.map((item, index) => (
          <MenuItem
            key={index}
            value={item.id}
            onClick={() => onClickLabelOption(item)}
            sx={{ fontSize: 16, "&:hover": { backgroundColor: "transparent" } }}
          >
            <Box display="flex" alignItems="center" width={1}>
              <Box>
                <LabelIcon sx={{ color: item.color, fontSize: 20 }} />
              </Box>
              <Box ml={4} component="span">
                {item.name}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <Box ml={1}>
        <Tooltip title="Move to">
          <IconButton sx={{ padding: 6 }} onClick={onShowFolders}>
            <FolderIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={showFolders}
        open={Boolean(showFolders)}
        onClose={onHideFolders}
      >
        {folderList.map((item, index) => (
          <MenuItem
            key={index}
            value={item.id}
            onClick={() => onClickFolderOption(item)}
            sx={{ fontSize: 16, "&:hover": { backgroundColor: "transparent" } }}
          >
            <Box display="flex" alignItems="center" width={1}>
              <Box>{item.icon}</Box>
              <Box ml={4} component="span">
                {item.name}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HeaderOptions;

HeaderOptions.propTypes = {
  onChangeMailFolder: PropTypes.func,
  onSelectLabel: PropTypes.func,
  labelsList: PropTypes.array.isRequired,
};
