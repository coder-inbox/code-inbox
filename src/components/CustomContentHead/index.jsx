import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import CustomTitle from "@app/components/CustomTitle";
import CustomSubTitle from "@app/components/CustomSubTitle";
import { useTheme } from "@mui/material";

function CustomContentHead({
  icon,
  avatar,
  title,
  titleProps,
  subTitle,
  subTitleProps,
  titleStyle,
  subTitleStyle,
  ...restProps
}) {
  const theme = useTheme();

  const headRootStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const avatarStyle = {
    marginRight: theme.spacing(2),
  };

  const headerContentStyle = {
    flex: 1,
  };

  return (
    <div sx={headRootStyle} className="custom-content-head" {...restProps}>
      {avatar && isValidElement(avatar) ? (
        <div sx={avatarStyle} className="custom-avatar">
          {avatar}
        </div>
      ) : (
        icon && (
          <div sx={avatarStyle} className="custom-avatar">
            {icon}
          </div>
        )
      )}
      <div sx={headerContentStyle} className="custom-header-content">
        {title && (
          <CustomTitle
            sx={titleStyle}
            className="custom-title"
            content={title}
            {...titleProps}
          />
        )}
        {subTitle && (
          <CustomSubTitle
            sx={subTitleStyle}
            className="custom-sub-title"
            content={subTitle}
            {...subTitleProps}
          />
        )}
      </div>
    </div>
  );
}

CustomContentHead.propTypes = {
  icon: PropTypes.element,
  avatar: PropTypes.element,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.object,
  subTitleProps: PropTypes.object,
  titleStyle: PropTypes.object,
  subTitleStyle: PropTypes.object,
};

CustomContentHead.defaultProps = {
  icon: null,
  avatar: null,
  title: null,
  subTitle: null,
  titleProps: { variant: "h4", component: "div" },
  subTitleProps: { variant: "subtitle2", component: "p", gutterBottom: false },
  titleStyle: {}, // You can add default styles here
  subTitleStyle: {}, // You can add default styles here
};

export default React.memo(CustomContentHead);
