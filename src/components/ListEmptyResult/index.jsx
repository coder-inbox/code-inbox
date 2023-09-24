import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const ListEmptyResult = ({
  loader,
  placeholder,
  loading,
  title,
  actionTitle,
  content,
  onClick,
  children,
}) => {
  const theme = useTheme();

  const emptyListContainerStyle = {
    flexDirection: "column",
    minHeight: 250,
    height: "100%",
    display: "flex",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    borderRadius: 4,
    textAlign: "center",
  };

  const flexRowStyle = {
    flexDirection: "row",
  };

  return (
    <Box sx={emptyListContainerStyle}>
      {loading || loader ? (
        placeholder ? (
          placeholder
        ) : (
          <>
            <CircularProgress size={16} />
            <span className="ml-2">Loading...</span>
          </>
        )
      ) : (
        <>
          {children ? (
            children
          ) : (
            <>
              {title && (
                <Box component="h4" fontSize={28} color="text.primary" mb={3}>
                  {title}
                </Box>
              )}
              <Box fontSize={18} component="p" color="text.secondary">
                {content}
              </Box>

              {actionTitle && (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginTop: 3, height: 45, minWidth: 150 }}
                  onClick={onClick}
                >
                  {actionTitle}
                </Button>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ListEmptyResult;
