import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import CustomAvatar from "@app/components/CustomAvatar";
import CustomTitle from "@app/components/CustomTitle";
import CustomSubTitle from "@app/components/CustomTitle";

const CustomMedia = ({
  avatar,
  avatarPos,
  avatarProps,
  onBodyClick,
  title,
  titleProps,
  subTitle,
  subTitleProps,
  actionsComponent,
  content,
  contentProps,
  footerComponent,
  footerComponentProps,
  children,
  className,
  ...rest
}) => {
  const theme = useTheme();

  const getAvatarComponent = () => {
    if (avatar) {
      const avatarClasses = {
        "custom-media-image": true,
        "custom-media-image-top": avatarPos === "top",
        "custom-media-image-center": avatarPos === "center",
        "custom-media-image-bottom": avatarPos === "bottom",
      };

      return (
        <div sx={avatarClasses}>
          <Box mr={3} clone>
            {isValidElement(avatar) ? (
              avatar
            ) : (
              <CustomAvatar
                sx={{ className: `custom-avatar ${theme.classes.rootAvatar}` }}
                src={avatar}
                {...avatarProps}
              />
            )}
          </Box>
        </div>
      );
    }
    return null;
  };

  const mediaObjectClasses = {
    "custom-media-object": true,
    [className]: className,
  };

  const mediaImageClasses = {
    "custom-media-body": true,
    "custom-media-image-top": avatarPos === "top",
    "custom-media-image-center": avatarPos === "center",
    "custom-media-image-bottom": avatarPos === "bottom",
  };

  const mediaHeaderClasses = {
    "custom-media-header": true,
    "ml-3": !!actionsComponent,
  };

  return (
    <Box sx={mediaObjectClasses} {...rest}>
      {getAvatarComponent()}
      <div sx={mediaImageClasses} onClick={onBodyClick}>
        <div sx={mediaHeaderClasses}>
          <div sx={{ className: "custom-media-header-content" }}>
            {title && <CustomTitle content={title} {...titleProps} />}
            {subTitle && (
              <CustomSubTitle content={subTitle} {...subTitleProps} />
            )}
          </div>
          {actionsComponent && (
            <div className="custom-media-actions ml-3">{actionsComponent}</div>
          )}
        </div>
        {content && (
          <div className="mb-3">
            {typeof content === "string" ? (
              <Typography {...contentProps}>{content}</Typography>
            ) : (
              content
            )}
          </div>
        )}
        {children}
      </div>
      {footerComponent && (
        <Box
          ml={3}
          sx={{ className: "custom-media-footer" }}
          {...footerComponentProps}
        >
          {footerComponent}
        </Box>
      )}
    </Box>
  );
};

CustomMedia.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  avatarPos: PropTypes.oneOf(["top", "center", "bottom"]),
  avatarProps: PropTypes.object,
  onBodyClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.object,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subTitleProps: PropTypes.object,
  actionsComponent: PropTypes.element,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  contentProps: PropTypes.object,
  footerComponent: PropTypes.element,
  footerComponentProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

CustomMedia.defaultProps = {
  avatar: "",
  avatarPos: "top",
  title: "",
  titleProps: {
    variant: "h3",
    component: "div",
  },
  subTitle: "",
  subTitleProps: {
    component: "span",
  },
  content: "",
  contentProps: {
    component: "div",
    variant: "body2",
  },
};

export default React.memo(CustomMedia);
