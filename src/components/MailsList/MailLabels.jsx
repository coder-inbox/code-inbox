import React from "react";
import CustomList from "@app/components/CustomList";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";

const LabelItem = ({ item, labelsList }) => {
  const label = labelsList.find((label) => label.id === item);
  const theme = useTheme();

  return (
    <>
      {label && (
        <Box
          component="span"
          sx={{
            backgroundColor: alpha(label.color, 0.1),
            color: label.color,
            display: "inline-block",
            padding: "4px 12px",
            marginRight: 6,
            borderRadius: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label.name}
        </Box>
      )}
    </>
  );
};

const MailLabels = ({ mailLabels, labelsList, width }) => {
  return (
    <CustomList
      style={{ display: "flex" }}
      data={width === "xl" ? mailLabels.slice(0, 2) : mailLabels.slice(0, 1)}
      renderRow={(item, index) => (
        <LabelItem item={item} key={index} labelsList={labelsList} />
      )}
    />
  );
};

export default MailLabels;

MailLabels.propTypes = {
  mailLabels: PropTypes.array.isRequired,
  labelsList: PropTypes.array.isRequired,
};
