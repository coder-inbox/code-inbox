import React from "react";
import { Box } from "@mui/material";
import CustomImage from "@app/components/CustomImage";
import { useTheme } from "@mui/material/styles";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
const EmptyMailsResult = () => {
  const theme = useTheme();

  return (
    <Box>
      <ManageSearchIcon
        sx={{ fontSize: 55, color: theme.palette.text.disabled }}
      />
      <Box
        sx={{ fontSize: 16, color: theme.palette.text.disabled }}
        component="p"
      >
        No emails found!
      </Box>
    </Box>
  );
};

export default EmptyMailsResult;
