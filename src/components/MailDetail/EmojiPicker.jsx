import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Picker from "emoji-picker-react";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const EmojiPicker = ({ onPickEmoji }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const theme = useTheme();

  const onEmojiClick = (emojiData, event) => {
    onPickEmoji(emojiData.emoji);
    setShowEmoji(!showEmoji);
  };

  const emojiPickerStyles = {
    position: "absolute",
    left: 0,
    top: "48px",
    zIndex: 1,
  };

  return (
    <Box
      sx={{
        position: "relative",
        "& .emoji-picker-react": {
          position: "absolute",
          left: 0,
          top: "48px",
          zIndex: 1,
        },
      }}
    >
      <IconButton onClick={() => setShowEmoji(!showEmoji)}>
        <InsertEmoticonIcon />
      </IconButton>
      {showEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          sx={{
            ...emojiPickerStyles,
          }}
        />
      )}
    </Box>
  );
};

export default EmojiPicker;

EmojiPicker.propTypes = {
  onPickEmoji: PropTypes.func,
};
