import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Box, Button, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ColorPickerPopup = ({ color, setColor }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tempColor, setTempColor] = useState(color ? color : "#333333");

  const openPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCancel = () => {
    setAnchorEl(null);
  };

  const onColorSelect = (color) => {
    setTempColor(color.hex);
  };

  const onUpdate = () => {
    setColor(tempColor);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const rootStyle = {
    "& .sketch-picker": {
      boxShadow: "none !important",
    },
  };

  const actionRootStyle = {
    padding: theme.spacing(1),
    "& .MuiButton-root:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  };

  return (
    <React.Fragment>
      <Box display="inline-block" p="3px" border={1} onClick={openPicker}>
        <Box height={27} width={27} sx={{ backgroundColor: tempColor }} />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={rootStyle}
        onClose={onCancel}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SketchPicker color={tempColor} onChange={onColorSelect} />

        <Box sx={actionRootStyle}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onUpdate}
          >
            Done
          </Button>
          <Button size="small" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default ColorPickerPopup;
