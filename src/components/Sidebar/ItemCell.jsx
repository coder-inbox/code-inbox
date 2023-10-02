import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material/styles";
import LabelIcon from "@mui/icons-material/Label";
import PropTypes from "prop-types";

const ItemCell = ({ item, selectedItem, onChange, counter }) => {
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        "&:hover, &:focus": {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.action.hover,
          ".custom-icon-root": {
            color: theme.palette.text.primary,
          },
        },
        "&.active": {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.text.disabled,
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
      button
      className={item.slug === selectedItem ? "active" : ""}
      onClick={() => onChange(item.slug)}
    >
      <ListItemIcon className="custom-icon-root">
        {item.icon ? (
          item.icon
        ) : (
          <LabelIcon sx={{ color: theme.palette.text.primary }} />
        )}
      </ListItemIcon>
      <ListItemText className="custom-nav-text" primary={item.name} />
      {counter > 0 && (
        <Box component="span" className="custom-nav-count">
          {counter}
        </Box>
      )}
    </ListItem>
  );
};

export default ItemCell;

ItemCell.propTypes = {
  item: PropTypes.object.isRequired,
  selectedItem: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

ItemCell.defaultProps = {
  selectedItem: "",
};
