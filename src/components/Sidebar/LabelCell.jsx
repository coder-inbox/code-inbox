import React, { useRef, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import LabelIcon from "@mui/icons-material/Label";
import PropTypes from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteLabel, updateLabel } from "@app/store/mailAppReducer/actions";
import CustomLabelForm from "@app/components/CustomLabelForm";
import { useTheme } from "@mui/material/styles";

const LabelCell = ({ item, selectedItem, onChange }) => {
  const theme = useTheme();
  const [isEdit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { counter } = useSelector(({ mailApp }) => mailApp);
  const dispatch = useDispatch();
  const [anchorEditEl, setAnchorEditEl] = useState(null);
  const labelRef = useRef(null);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const onClickEditLabel = (event) => {
    setEdit(true);
    handleMenuClose(event);
    setAnchorEditEl(labelRef.current);
  };

  const handleEditClose = () => {
    setAnchorEditEl(null);
  };

  const onClickDeleteLabel = (e) => {
    dispatch(deleteLabel(item.id));
    handleMenuClose(e);
  };

  return (
    <>
      <ListItem
        ref={labelRef}
        button
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "9px 16px 10px 20px",
          marginRight: 16,
          fontSize: 14,
          fontWeight: theme.typography.fontWeightBold,
          width: "auto",
          whiteSpace: "nowrap",
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          color: theme.palette.text.secondary,
          transition: "all 0.3s ease",
          position: "relative",
          cursor: "pointer",
          "&:hover, &:focus": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
            ".custom-icon-root": {
              color: theme.palette.text.primary,
            },
          },
          "&.active": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.selected,
            ".custom-icon-root": {
              color: theme.palette.primary.main,
            },
            "&:hover, &:focus": {
              ".custom-icon-root": {
                color: theme.palette.primary.main,
              },
            },
          },
        }}
        className={selectedItem === item.id ? "active" : ""}
        onClick={() => onChange(item.id)}
      >
        <ListItemIcon
          sx={{
            minWidth: 10,
          }}
          className="custom-icon-root"
        >
          {item.icon ? item.icon : <LabelIcon sx={{ color: item.color }} />}
        </ListItemIcon>
        <ListItemText
          className="custom-nav-text"
          primary={item.name}
          sx={{
            marginLeft: 20,
            opacity: 1,
            visibility: "visible",
            whiteSpace: "nowrap",
            ".MuiTypography-body1": {
              fontSize: 14,
              fontWeight: theme.typography.fontWeightBold,
            },
          }}
        />
        {counter && counter.labels[item.id] > 0 && (
          <Box
            component="span"
            className="custom-nav-count"
            sx={{
              transition: "all 0.3s ease",
              opacity: 1,
              visibility: "visible",
            }}
          >
            {counter.labels[item.id]}
          </Box>
        )}
        <Box className="custom-more-vert-icon">
          <MoreVertIcon onClick={handleMenuClick} />
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onClickEditLabel}>Edit</MenuItem>
          <MenuItem onClick={onClickDeleteLabel}>Delete</MenuItem>
        </Menu>
      </ListItem>

      {isEdit && (
        <CustomLabelForm
          anchorEl={anchorEditEl}
          onClose={handleEditClose}
          label={item}
          setEdit={setEdit}
          saveLabel={updateLabel}
        />
      )}
    </>
  );
};

export default LabelCell;

LabelCell.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  selectedItem: PropTypes.string,
};

LabelCell.defaultProps = {
  selectedItem: "",
};
