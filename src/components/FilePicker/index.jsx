import React from "react";
import { useDropzone } from "react-dropzone";
import { IconButton, Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const FilePicker = ({ onAddAttachments }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, .pdf, .zip",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          id: Math.floor(Math.random() * 10000),
          file,
        };
      });
      onAddAttachments(files);
    },
  });

  return (
    <Box {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <Tooltip title="Attachments">
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FilePicker;

FilePicker.propTypes = {
  onAddAttachments: PropTypes.func,
};
