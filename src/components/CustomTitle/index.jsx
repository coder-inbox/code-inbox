import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const CustomTitle = ({ content, sx, ...titleProps }) => {
  if (!content) return null;

  return isValidElement(content) ? (
    content
  ) : (
    <Typography sx={sx} {...titleProps}>
      {content}
    </Typography>
  );
};

CustomTitle.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  sx: PropTypes.object,
};

CustomTitle.defaultProps = {
  content: "",
  variant: "h2",
  component: "div",
  className: null,
  sx: {},
};

export default CustomTitle;
