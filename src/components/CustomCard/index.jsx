import React, { Children, cloneElement, isValidElement, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Card, useTheme } from "@mui/material";

const getBackgroundStyle = (
  backgroundColor,
  backgroundImage,
  gradientDirection,
) => {
  if (backgroundImage)
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center center`,
      backgroundSize: "cover",
    };

  if (
    typeof backgroundColor === "string" ||
    (Array.isArray(backgroundColor) && backgroundColor.length === 1)
  ) {
    return { backgroundColor: backgroundColor.toString() };
  }

  if (Array.isArray(backgroundColor) && backgroundColor.length > 1) {
    const [firstColor] = backgroundColor[0].split(" ");
    return {
      backgroundColor: firstColor,
      backgroundImage: gradientDirection
        ? `linear-gradient(${gradientDirection}, ${backgroundColor.join(", ")})`
        : `linear-gradient(${backgroundColor.join(", ")})`,
    };
  }
  return null;
};

const getOverlayStyle = (overlay) => {
  if (overlay.colors) {
    if (
      typeof overlay.colors === "string" ||
      (Array.isArray(overlay.colors) && overlay.colors.length === 1)
    ) {
      return {
        backgroundColor: overlay.colors.toString(),
        opacity: overlay.opacity,
      };
    } else if (Array.isArray(overlay.colors) && overlay.colors.length > 1) {
      const [firstColor] = overlay.colors[0].split(" ");
      return {
        backgroundColor: firstColor,
        backgroundImage: overlay.direction
          ? `linear-gradient(${overlay.direction}, ${overlay.colors.join(
              ", ",
            )})`
          : `linear-gradient(${overlay.colors.join(", ")})`,
        opacity: overlay.opacity,
      };
    }
  }
  return null;
};

const CustomCard = ({
  backgroundColor,
  backgroundImage,
  gradientDirection,
  overlay,
  children,
  ...cardProps
}) => {
  const backgroundStyles = getBackgroundStyle(
    backgroundColor,
    backgroundImage,
    gradientDirection,
  );
  const overlayStyles = getOverlayStyle(overlay);

  const theme = useTheme();
  const headerRef = useRef(null);

  const handleMouseEnter = () => {
    if (headerRef.current) headerRef.current.onHeaderMouseEntered();
  };

  const handleMouseLeave = () => {
    if (headerRef.current) headerRef.current.onHeaderMouseLeft();
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      if (child.type.render && child.type.render.name) {
        if (child.type.render.name === "CustomCardHeader") {
          return cloneElement(child, { ref: headerRef });
        }
      } else {
        return cloneElement(child);
      }
    }
    return child;
  });

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        ...backgroundStyles,
        position: "relative",
        "& .Cmt-card-content": { position: "relative", zIndex: 1 },
      }}
      {...cardProps}
    >
      {childrenWithProps}
      {overlay.colors && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            ...overlayStyles,
          }}
          className="Cmt-card-overlay"
        />
      )}
    </Card>
  );
};

CustomCard.propTypes = {
  backgroundColor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  backgroundImage: PropTypes.string,
  gradientDirection: PropTypes.string,
  overlay: PropTypes.object,
  children: PropTypes.node,
};

CustomCard.defaultProps = {
  overlay: { colors: "", opacity: 0, direction: "" },
};

export default CustomCard;
