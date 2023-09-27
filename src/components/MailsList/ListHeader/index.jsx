import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterType,
  updateMailsFolder,
  updateMailsLabel,
} from "@app/store/mailAppReducer/actions";
import MoreOptions from "./MoreOptions";
import HeaderOptions from "./HeaderOptions";
import AppSelectBox from "@app/components/AppSelectBox";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

const selectCategories = [
  { id: 12, label: "None", slug: "none" },
  { id: 11, label: "All", slug: "all" },
  { id: 1, label: "Important", slug: "important" },
  { id: 2, label: "Read", slug: "read" },
  { id: 3, label: "Unread", slug: "unread" },
  { id: 4, label: "Starred", slug: "starred" },
];

const onSelectMails = (category, mails) => {
  let selectedMails = [];
  switch (category) {
    case "all": {
      selectedMails = mails;
      break;
    }
    case "important": {
      selectedMails = mails.filter((mail) => mail.important);
      break;
    }
    case "read": {
      selectedMails = mails.filter((mail) => !mail.unread);
      break;
    }
    case "unread": {
      selectedMails = mails.filter((mail) => mail.unread);
      break;
    }
    case "starred": {
      selectedMails = mails.filter((mail) => mail.starred);
      break;
    }
    default:
  }
  return selectedMails.map((mail) => mail.id);
};

const ListHeader = ({ checkedMails, setCheckedMails }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(selectCategories[0].slug);
  const theme = useTheme();

  const { mailsList, labelsList, filterType, totalMailCount } = useSelector(
    ({ mailApp }) => mailApp
  );

  useEffect(() => {
    const selectedMails = onSelectMails(category, mailsList);
    setCheckedMails(selectedMails);
  }, [category, dispatch, setCheckedMails, mailsList]);

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      const mailIds = mailsList.map((mail) => mail.id);
      setCheckedMails(mailIds);
    } else {
      setCheckedMails([]);
      setCategory("none");
    }
  };

  const onChangeMailFolder = (folder) => {
    dispatch(updateMailsFolder(checkedMails, folder));
    setCheckedMails([]);
  };

  const onSelectLabel = (label) => {
    dispatch(updateMailsLabel(checkedMails, label));
    setCheckedMails([]);
  };

  const onPageChange = (event, value) => {
    dispatch(
      setFilterType({
        ...filterType,
        page: value,
      })
    );
  };

  return (
    <Box
      sx={{
        padding: "11px 16px 10px 16px",
        height: 78,
        borderBottom: `1px solid ${theme.palette.borderColor.main}`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox
        color="primary"
        indeterminate={
          checkedMails.length > 0 && checkedMails.length < mailsList.length
        }
        checked={
          checkedMails.length > 0 && checkedMails.length === mailsList.length
        }
        onChange={handleCheckBox}
      />

      <AppSelectBox
        id="mail-app"
        data={selectCategories}
        value={category}
        fullWidth={false}
        onChange={(e) => setCategory(e.target.value)}
        sx={{
          fontSize: 14,
          letterSpacing: 0.25,
          color: theme.palette.text.disabled,
          marginLeft: 10,
          "&:before, &:after": { display: "none" },
          "& .MuiSelect-select:focus": { backgroundColor: "transparent" },
        }}
        renderRow={(item, index) => (
          <MenuItem key={index} value={item.slug}>
            {item.label}
          </MenuItem>
        )}
      />

      {checkedMails.length > 0 ? (
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <HeaderOptions
            onChangeMailFolder={onChangeMailFolder}
            onSelectLabel={onSelectLabel}
            labelsList={labelsList}
          />
          <MoreOptions
            checkedMails={checkedMails}
            setCheckedMails={setCheckedMails}
            mailsList={mailsList}
          />
        </Box>
      ) : (
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          {totalMailCount ? (
            <TablePagination
              component="div"
              count={totalMailCount}
              rowsPerPage={10}
              page={filterType.page}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              onPageChange={onPageChange}
              rowsPerPageOptions={[]}
            />
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default ListHeader;

ListHeader.propTypes = {
  checkedMails: PropTypes.array.isRequired,
  setCheckedMails: PropTypes.func,
};
