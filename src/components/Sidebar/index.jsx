import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import CustomList from "@app/components/CustomList";
import ItemCell from "./ItemCell";
import ConnectionCell from "./ConnectionCell";
import {
  getConnectionsList,
  getLabelsList,
  setFilterType,
} from "@app/store/mailAppReducer/actions";
import AddLabel from "./AddLabel";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getAppSidebarHeight } from "@app/constants";
import EditIcon from "@mui/icons-material/Edit";
import LabelCell from "./LabelCell";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import StarIcon from "@mui/icons-material/Star";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";

const folderList = [
  { id: 1, name: "Inbox", slug: "inbox", icon: <MoveToInboxIcon /> },
  { id: 2, name: "Sent", slug: "sent", icon: <SendIcon /> },
  { id: 3, name: "Drafts", slug: "drafts", icon: <DraftsIcon /> },
  { id: 5, name: "Spam", slug: "spam", icon: <ReportIcon /> },
  { id: 6, name: "Trash", slug: "trash", icon: <DeleteIcon /> },
  { id: 7, name: "Archived", slug: "archived", icon: <ArchiveIcon /> },
];

const filterOptions = [
  { id: 1, name: "Important", slug: "important", icon: <LabelImportantIcon /> },
  { id: 2, name: "Starred", slug: "starred", icon: <StarIcon /> },
];

const Sidebar = ({ width, onOpenComposeDialog, onClickSendMail }) => {
  const {
    isSideBarCollapsed,
    labelsList,
    connectionsList,
    filterType,
    selectedMail,
    counter,
  } = useSelector(({ mailApp }) => mailApp);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getLabelsList());
    dispatch(getConnectionsList());
  }, [dispatch]);

  const onChangeFolder = (folder) => {
    dispatch(
      setFilterType({
        selectedFolder: folder,
        selectedFilter: "",
        selectedLabel: "",
        searchText: "",
        page: 0,
      })
    );
  };

  const onChangeFilter = (filter) => {
    dispatch(
      setFilterType({
        selectedFolder: "",
        selectedFilter: filter,
        selectedLabel: "",
        searchText: "",
        page: 0,
      })
    );
  };

  const onChangeLabel = (label) => {
    dispatch(
      setFilterType({
        selectedFolder: "",
        selectedFilter: "",
        selectedLabel: label,
        searchText: "",
        page: 0,
      })
    );
  };

  return (
    <Box
      sx={{
        width: width,
        borderRight: `solid 1px ${theme.palette.borderColor.main}`,
        overflowY: "auto",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          padding: 2,
          paddingBottom: 5,
          paddingTop: 10,
          transition: "all 0.3s ease",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onOpenComposeDialog()}
          sx={{
            width: width > 100 ? "100%" : "inherit",
            padding: "8px 16px",
            overflow: "hidden",
          }}
        >
          <EditIcon />
          <Box
            component="span"
            sx={{
              marginLeft: 10,
              transition: "all 0.3s ease",
              opacity: width < 100 ? 0 : 1,
              visibility: "visible",
              whiteSpace: "nowrap",
              [theme.breakpoints.down("sm")]: {
                opacity: 0,
                visibility: "hidden",
                width: 0,
                marginLeft: 0,
              },
            }}
          >
            Compose
          </Box>
        </Button>
      </Box>
      <PerfectScrollbar
        style={{
          height: "100%",
        }}
      >
        <List component="nav" sx={{ padding: 0 }}>
          <CustomList
            data={folderList}
            renderRow={(item, index) => (
              <ItemCell
                key={index}
                item={item}
                counter={counter ? counter.folders[item.slug] : 0}
                selectedItem={filterType.selectedFolder}
                onChange={onChangeFolder}
              />
            )}
          />

          <ListItem
            component="div"
            sx={{
              position: "relative",
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
              borderTop: "solid 1px transparent",
            }}
          >
            <Box
              component="span"
              sx={{
                paddingTop: 2,
                paddingBottom: 2,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.secondary,
                letterSpacing: 1.5,
              }}
            >
              Filters
            </Box>
          </ListItem>

          <CustomList
            data={filterOptions}
            renderRow={(item, index) => (
              <ItemCell
                key={index}
                item={item}
                counter={counter ? counter.filters[item.slug] : 0}
                selectedItem={filterType.selectedFilter}
                onChange={onChangeFilter}
              />
            )}
          />

          <ListItem
            component="div"
            sx={{
              position: "relative",
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 0,
              borderTop: "solid 1px transparent",
            }}
          >
            <Box
              component="span"
              sx={{
                paddingTop: 2,
                paddingBottom: 2,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.secondary,
                letterSpacing: 1.5,
              }}
            >
              Labels
            </Box>
          </ListItem>

          <CustomList
            data={labelsList}
            renderRow={(item, index) => (
              <LabelCell
                key={index}
                item={item}
                selectedItem={filterType.selectedLabel}
                onChange={onChangeLabel}
              />
            )}
          />

          <AddLabel />

          <ListItem
            component="div"
            sx={{
              position: "relative",
              paddingLeft: 11,
              paddingRight: 16,
              paddingBottom: 0,
              borderTop: "solid 1px transparent",
            }}
          >
            <Box
              component="span"
              sx={{
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "bold",
                color: theme.palette.text.secondary,
                letterSpacing: 1.5,
              }}
            >
              Connections
            </Box>
          </ListItem>

          <CustomList
            style={{ marginBottom: 10 }}
            data={connectionsList}
            renderRow={(item, index) => (
              <ConnectionCell
                key={index}
                item={item}
                onClickSendMail={onClickSendMail}
              />
            )}
          />
        </List>
      </PerfectScrollbar>
    </Box>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  onOpenComposeDialog: PropTypes.func,
};
