import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilePicker from "../FilePicker";
import Chip from "@mui/material/Chip";
import EmojiPicker from "./EmojiPicker";
import PropTypes from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import AppTextInput from "@app/components/AppTextInput";
import { useTheme } from "@mui/material/styles";

const ReplyMailForm = ({ threadId, onClickReplyMail }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const theme = useTheme();

  const onAddAttachments = (files) => {
    const newAttachments = files.map((item) => {
      return {
        id: item.id,
        originalFile: item.file,
        file: {
          name: item.file.name,
          type: item.file.type,
          size: item.file.size,
          path: item.file.path,
        },
      };
    });
    setAttachments([...attachments, ...newAttachments]);
  };

  const onDeleteAttachments = (fileId) => {
    const updatedAttachments = attachments.filter((item) => item.id !== fileId);
    setAttachments(updatedAttachments);
  };

  const onPickEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const onClickSend = () => {
    if (message || attachments.length > 0) {
      const mail = {
        "thread_id": threadId,
        "body": message,
      };
      console.log(mail)
      onClickReplyMail(mail);
      setAttachments([]);
      setMessage("");
    }
  };

  return (
    <Box>
      {attachments.length > 0 && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          {attachments.map((item, index) => (
            <Chip
              key={index}
              label={item.file.name}
              onDelete={() => onDeleteAttachments(item.id)}
            />
          ))}
        </Box>
      )}
      <Box
        sx={{
          marginTop: "auto",
          padding: "20px 36px",
          borderTop: `1px solid ${theme.palette.borderColor.main}`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          [theme.breakpoints.down("xs")]: {
            paddingLeft: 20,
            paddingRight: 20,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flex: "1",
          }}
        >
          <Box
            sx={{
              display: "flex",
              mr: { md: 2 },
              mt: -1,
            }}
          >
            <EmojiPicker onPickEmoji={onPickEmoji} />
          </Box>
          <Box sx={{ width: 1 }}>
            <AppTextInput
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              placeholder="Send a reply..."
              sx={{
                margin: 0,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              mr: 2,
              "& .dropzone": {
                padding: 0,
                border: "0 none",
                backgroundColor: "transparent",
              },
            }}
          >
            <FilePicker onAddAttachments={onAddAttachments} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickSend}
            disabled={!message && attachments.length === 0}
            sx={{
              "& .MuiSvgIcon-root": {
                marginRight: 6,
              },
            }}
          >
            <SendIcon /> Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyMailForm;

ReplyMailForm.propTypes = {
  onClickReplyMail: PropTypes.func,
  threadId: PropTypes.string.isRequired,
};
