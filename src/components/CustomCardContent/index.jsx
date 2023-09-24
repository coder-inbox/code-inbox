import React from "react";
import { CardContent, useTheme } from "@mui/material";

const CustomCardContent = ({ children, className, ...rest }) => {
  const theme = useTheme();

  const rootStyle = {
    padding: theme.spacing(3),
  };

  return (
    <CardContent sx={{ ...rootStyle }} className="Cmt-card-content" {...rest}>
      {children}
    </CardContent>
  );
};

export default CustomCardContent;
