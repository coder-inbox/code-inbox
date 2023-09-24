import React, { useEffect, useState } from "react";
import { Box, Button, InputLabel, Popover } from "@mui/material";
import { useDispatch } from "react-redux";
import AppTextInput from "@app/components/AppTextInput";
import ColorPickerPopup from "@app/components/ColorPickerPopup";
import { useTheme } from "@mui/material/styles";

const CustomLabelForm = ({ title, anchorEl, onClose, label, saveLabel }) => {
  const theme = useTheme();
  const [color, setColor] = useState(label ? label.color : "#333333");
  const [name, setName] = useState(label ? label.name : "");
  const [nameError, setNameError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (label) {
      setName(label.name);
      setColor(label.color);
    }
  }, [label]);

  const validateForm = (labelName) => {
    if (!labelName) {
      setNameError("Label name is required!");
    } else {
      setNameError("");
    }
  };

  const onLabelChange = (event) => {
    const label = event.target.value;
    setName(label);
    validateForm(label);
  };

  const submitForm = (event) => {
    event.preventDefault();
    validateForm(name);
    if (name) {
      handleSubmitLabel();
    }
  };

  const closeFormPopup = () => {
    setColor("#333333");
    setName("");
    if (onClose) onClose();
  };

  const handleSubmitLabel = () => {
    dispatch(
      saveLabel({
        ...label,
        name,
        color,
      })
    );
    closeFormPopup();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const inputBoxRootStyle = {
    "& .MuiInputBase-input": {
      paddingBottom: theme.spacing(1),
      fontSize: 14,
      letterSpacing: 0.25,
      color: theme.palette.common.dark,
    },
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box p={4} component="form" onSubmit={submitForm}>
        <Box fontSize={12} color="text.secondary" mb={2} clone>
          <InputLabel htmlFor="my-input">{title || "Label Name"}</InputLabel>
        </Box>
        <Box display="flex" alignItems="center" mb={5}>
          <AppTextInput
            sx={inputBoxRootStyle}
            value={name}
            onChange={onLabelChange}
            required
            helperText={nameError}
          />

          <Box ml={4} pb={nameError ? "23px" : ""}>
            <ColorPickerPopup color={color} setColor={setColor} />
          </Box>
        </Box>

        <Box display="flex">
          <Box mr={3} clone>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </Box>
          <Button size="small" onClick={closeFormPopup}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default CustomLabelForm;
