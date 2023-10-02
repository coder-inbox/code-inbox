import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import CustomList from "@app/components/CustomList";
import ItemCell from "./ItemCell";
import ContactCell from "./ContactCell";
import {
  getContactsList,
  getLabelsList,
  setFilterType,
} from "@app/store/mailAppReducer/actions";
import AddLabel from "./AddLabel";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import LabelCell from "./LabelCell";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import StarIcon from "@mui/icons-material/Star";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import PersonalIcon from "@mui/icons-material/Person";
import SocialIcon from "@mui/icons-material/People";
import ForumsIcon from "@mui/icons-material/Forum";
import EmailIcon from "@mui/icons-material/Email";

const Sidebar = ({ width, onOpenComposeDialog, onClickSendMail }) => {
  const {
    isSideBarCollapsed,
    labelsList,
    contactsList,
    filterType,
    selectedMail,
    counter,
  } = useSelector(({ mailApp }) => mailApp);
  const dispatch = useDispatch();
  const theme = useTheme();

  const folderList = [
    {
      id: 1,
      name: "All Mail",
      slug: "all",
      icon: (
        <MailOutlineIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Inbox",
      slug: "inbox",
      icon: (
        <MoveToInboxIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 3,
      name: "Sent",
      slug: "sent",
      icon: (
        <SendIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 4,
      name: "Drafts",
      slug: "drafts",
      icon: (
        <DraftsIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 5,
      name: "Spam",
      slug: "spam",
      icon: (
        <ReportIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 6,
      name: "Trash",
      slug: "trash",
      icon: (
        <DeleteIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 7,
      name: "Archived",
      slug: "archived",
      icon: (
        <ArchiveIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 8,
      name: "Promotions",
      slug: "promotions",
      icon: (
        <EmailIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 9,
      name: "Personal",
      slug: "personal",
      icon: (
        <PersonalIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 10,
      name: "Social",
      slug: "social",
      icon: (
        <SocialIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
    {
      id: 11,
      name: "Forums",
      slug: "forums",
      icon: (
        <ForumsIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
  ];

  const filterOptions = [
    {
      id: 1,
      name: "Starred",
      slug: "starred",
      icon: (
        <StarIcon
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getLabelsList());
    dispatch(getContactsList());
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
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
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
              Contacts
            </Box>
          </ListItem>

          <CustomList
            style={{ marginBottom: 10 }}
            data={contactsList}
            renderRow={(item, index) => (
              <ContactCell
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
