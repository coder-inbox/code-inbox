import React, { useImperativeHandle, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomContentHead from "@app/components/CustomContentHead";
import CustomDropdownMenu from "@app/components/CustomDropdownMenu";

const contentRef = React.createRef();

const ActionsMenu = ({ actions, actionHandler, icon }) => {
  return (
    <CustomDropdownMenu
      TriggerComponent={
        <IconButton size="small">{icon || <MoreVertIcon />}</IconButton>
      }
      items={actions}
      onItemClick={actionHandler}
    />
  );
};

const CustomCardHeader = React.forwardRef(function CustomCardHeader(
  props,
  ref
) {
  const {
    icon,
    avatar,
    title,
    titleProps,
    subTitle,
    subTitleProps,
    actions,
    actionMenuClassName,
    actionHandleIcon,
    actionHandler,
    actionsPos,
    actionsShowOnHover,
    backgroundColor,
    gradientDirection,
    separator,
    alignCenter,
    children,
    className,
    ...rest
  } = props;

  const [showActions, setActionsVisibility] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const contentHeadProps = {
    icon,
    avatar,
    title,
    titleProps,
    subTitle,
    subTitleProps,
  };

  const theme = useTheme();

  const headerRootStyle = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    zIndex: 1,
    padding: theme.spacing(3),
    ...(separator.color && {
      ...separatorStyles,
      "& + .custom-card-content": {
        paddingTop: theme.spacing(3),
      },
    }),
    "& + .custom-card-content": {
      paddingTop: 0,
    },
  };

  const titleStyle = {
    position: "relative",
  };

  const subTitleStyle = {
    marginBottom: 0,
    marginTop: theme.spacing(1),
    fontSize: 12,
    color: theme.palette.text.disabled,
    letterSpacing: 0.4,
    fontWeight: theme.typography.fontWeightRegular,
  };

  const showHideActionStyles = {
    "0%": {
      animationTimingFunction: "ease-in",
      opacity: 0,
      transform: "scale(0)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  };

  const actionMenuStyle = {
    "& button": {
      padding: 0,
      height: 40,
      width: 40,
      minWidth: "auto",
      fontSize: 10,
    },
  };

  const actionMenuDefaultStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1),
    "& .custom-action-menu-hover": {
      top: "50%",
    },
  };

  const actionMenuAbsoluteStyle = {
    position: "relative",
    paddingTop: theme.spacing(4),
    "& .custom-action-menu": {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 2,
      textAlign: "center",
      transition: "all 0.25s ease",
    },
  };

  const actionMenuHoverStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    transition: "all 0.25s ease",
  };

  let showHideActionClass = showActions
    ? showActionStyles
    : showHideActionStyles;
  if (actionsPos === "default") {
    showHideActionClass = showActions
      ? actionMenuDefaultStyle
      : actionMenuStyle;
  }

  const headerRootClasses = alignCenter
    ? ` ${className} custom-header-root ${
        separator.color ? " custom-separator" : ""
      }`
    : ` ${className} custom-header-root${
        separator.color ? " custom-separator" : ""
      }`;

  const menuRootClasses = actionsShowOnHover
    ? `custom-action-menu-hover ${showHideActionClass} ${actionMenuClassName}`
    : `${actionMenuStyle} custom-action-menu ${actionMenuClassName}`;

  const menuRootActionsClasses = actionsShowOnHover
    ? actionsPos === "default"
      ? `${actionMenuDefaultStyle}`
      : ""
    : `${actionMenuDefaultStyle}`;

  useImperativeHandle(ref, () => ({
    onHeaderMouseEntered: () => {
      if (actionsShowOnHover) setActionsVisibility(true);
    },
    onHeaderMouseLeft: () => {
      if (actionsShowOnHover) setActionsVisibility(false);
    },
  }));

  useEffect(() => {
    setContentWidth(contentRef.current ? contentRef.current.clientWidth : 0);
  }, [actionsPos, actionsShowOnHover]);

  return (
    <Box sx={headerRootStyle} {...rest}>
      {(icon || avatar || title || subTitle) && (
        <CustomContentHead
          titleStyle={titleStyle}
          subTitleStyle={subTitleStyle}
          {...contentHeadProps}
        />
      )}

      {(actions.length > 0 || children) && (
        <Box ref={contentRef} sx={menuRootActionsClasses}>
          {children}
          {actions.length > 0 && (
            <Box style={{ marginLeft: theme.spacing(2) }} sx={menuRootClasses}>
              <ActionsMenu
                actions={actions}
                actionHandler={actionHandler}
                icon={actionHandleIcon}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
});

CustomCardHeader.propTypes = {
  icon: PropTypes.element,
  avatar: PropTypes.element,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.object,
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subTitleProps: PropTypes.object,
  actions: PropTypes.array, // example: [{ label: "Close", icon: "icon-slug", onClick: (func optional), ... }, ...]
  actionMenuClassName: PropTypes.string,
  actionHandleIcon: PropTypes.element,
  actionsPos: PropTypes.oneOf(["default", "top-corner"]),
  actionsShowOnHover: PropTypes.bool,
  actionHandler: PropTypes.func,
  alignCenter: PropTypes.bool,
  backgroundColor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  gradientDirection: PropTypes.string,
  separator: PropTypes.object,
  className: PropTypes.string,
};

CustomCardHeader.defaultProps = {
  title: "",
  subTitle: "",
  actions: [],
  actionsPos: "default",
  actionsShowOnHover: false,
  actionMenuClassName: "",
  actionHandler: null,
  alignCenter: false,
  separator: { color: "", borderWidth: 0, borderStyle: "solid" },
  className: "",
};

export default CustomCardHeader;
