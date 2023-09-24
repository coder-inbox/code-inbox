import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const CustomSubTitle = ({ content, sx, ...subTitleProps }) => {
  if (!content) return null;

  return isValidElement(content) ? (
    content
  ) : (
    <Typography sx={sx} {...subTitleProps}>
      {content}
    </Typography>
  );
};

CustomSubTitle.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  sx: PropTypes.object,
};

CustomSubTitle.defaultProps = {
  content: "",
  variant: "subtitle1",
  gutterBottom: true,
  sx: {},
};

export default CustomSubTitle;
