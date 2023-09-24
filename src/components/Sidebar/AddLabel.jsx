import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addNewLabel } from "@app/store/mailAppReducer/actions";
import { useTheme } from "@mui/material/styles";
import CustomLabelForm from "@app/components/CustomLabelForm";

const AddLabel = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="appNavItem"
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 4px",
          marginRight: 1,
          fontSize: 14,
          fontWeight: theme.typography.fontWeightBold,
          width: "auto",
          whiteSpace: "nowrap",
          borderRadius: 7,
          color: theme.palette.text.secondary,
          transition: "all 0.3s ease",
          position: "relative",
          cursor: "pointer",
          "&:hover, &:focus": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Box
          className="custom-icon-root"
          sx={{
            marginLeft: 3,
            minWidth: 18,
          }}
        >
          <AddIcon />
        </Box>
        <Box
          component="span"
          className="custom-nav-text"
          sx={{
            marginTop: 4,
            marginBottom: 4,
            marginLeft: 9,
            transition: "all 0.3s ease",
            opacity: 1,
            visibility: "visible",
            fontSize: 16,
            fontWeight: theme.typography.fontWeightBold,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          Add Label
        </Box>
      </Box>

      <CustomLabelForm
        anchorEl={anchorEl}
        onClose={handleClose}
        saveLabel={addNewLabel}
      />
    </>
  );
};

export default AddLabel;
