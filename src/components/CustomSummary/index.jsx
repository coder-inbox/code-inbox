import React from "react";
import PropTypes from "prop-types";
import { Box, Badge } from "@mui/material";
import CustomAvatar from "@app/components/CustomAvatar";
import { useTheme } from "@mui/material/styles";

const CustomSummary = ({
  align,
  anchorOrigin,
  showItemBadge,
  avatar,
  avatarProps,
  badge,
  badgeProps,
  title,
  titleProps,
  subTitle,
  subTitleProps,
}) => {
  const theme = useTheme();

  const badgeContent = {
    badgeContent: badge,
    color: "secondary",
    ...badgeProps,
  };

  if (typeof badge !== "string") {
    const node = (
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.15)",
          borderRadius: 30,
          padding: "4px",
          display: "flex",
          alignItems: "center",
        }}
        className="custom-badge"
      >
        {badge}
      </div>
    );
    badgeContent.badgeContent = node;
  }

  const getAvatarComponent = () => {
    if (showItemBadge) {
      if (typeof avatar === "string") {
        return <CustomAvatar src={avatar} alt={title} {...avatarProps} />;
      }
      return avatar;
    }

    return (
      <RenderBadge {...{ badge, anchorOrigin, badgeContent }}>
        {typeof avatar === "string" ? (
          <CustomAvatar src={avatar} alt={title} {...avatarProps} />
        ) : (
          avatar
        )}
      </RenderBadge>
    );
  };

  const componentContent = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: align === "vertical" ? "column" : "row",
          textAlign: align === "vertical" ? "center" : "left",
        }}
        className={align}
      >
        {getAvatarComponent()}
        <div
          className="custom-user-info"
          style={{
            marginLeft: align === "horizontal" ? "15px" : "0",
            marginTop: "0",
          }}
        >
          <Box
            component="p"
            style={{
              fontSize: "14px",
              color: theme.palette.text.primary,
              margin: "0",
            }}
            {...titleProps}
          >
            {title}
          </Box>
          <Box
            component="p"
            style={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
              margin: "0",
            }}
            {...subTitleProps}
          >
            {subTitle}
          </Box>
        </div>
      </div>
    );
  };

  const getComponent = () => {
    if (showItemBadge) {
      return (
        <RenderBadge {...{ badge, anchorOrigin, badgeContent }}>
          {componentContent()}
        </RenderBadge>
      );
    }
    return componentContent();
  };

  return getComponent();
};

const RenderBadge = ({ badge, badgeContent, anchorOrigin, children }) => {
  return badge ? (
    <Badge
      className={`custom-badge-avatar ${anchorOrigin.vertical} ${anchorOrigin.horizontal}`}
      {...badgeContent}
      anchorOrigin={anchorOrigin}
    >
      {children}
    </Badge>
  ) : (
    children
  );
};

CustomSummary.propTypes = {
  align: PropTypes.string,
  anchorOrigin: PropTypes.object,
  showItemBadge: PropTypes.bool,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  avatarProps: PropTypes.object,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  badgeProps: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.object,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subTitleProps: PropTypes.object,
};

CustomSummary.defaultProps = {
  align: "horizontal",
  showItemBadge: false,
  anchorOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

export default React.memo(CustomSummary);
