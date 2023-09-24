import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import ReplyIcon from "@mui/icons-material/Reply";

const linkify = (inputText) => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 =
    /(([a-zA-Z0-9\-_.])+@[a-zA-Z0-9\\-]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
};

const MailReply = ({
  reply,
  getMailDate,
  onShowAttachments,
  onClickForwardMail,
}) => {
  return (
    <Box
      sx={{
        padding: "30px 24px 16px 30px",
        position: "relative",
        "&:not(:first-child)": {
          borderTop: `solid 1px ${theme.palette.borderColor.main}`,
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.dark, 0.04),
          "& $replyRoot": { opacity: 1, visibility: "visible" },
        },
        [theme.breakpoints.down("xs")]: { paddingLeft: 20, paddingRight: 20 },
      }}
    >
      <Box
        sx={{
          paddingTop: 10,
          paddingBottom: 20,
          [theme.breakpoints.up("sm")]: { paddingTop: 15, paddingBottom: 40 },
          [theme.breakpoints.up("xl")]: {
            width: "80%",
            margin: "0 auto",
            paddingTop: 25,
            paddingBottom: 50,
          },
        }}
      >
        <Box
          sx={{
            border: `solid 1px ${theme.palette.borderColor.main}`,
            padding: "5px 12px",
            borderRadius: 4,
            position: "absolute",
            left: "50%",
            top: -17,
            zIndex: 1,
            transform: "translateX(-50%)",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {getMailDate(reply.date)}
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 30,
            top: 20,
            zIndex: 1,
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <IconButton onClick={() => onClickForwardMail(reply.message)}>
            <ReplyIcon />
          </IconButton>
        </Box>
        {reply.message && (
          <Box
            sx={{
              mb: reply.attachments.length > 0 ? 8 : 0,
              p: { xs: 20, sm: 40, xl: "80%" },
            }}
            component="p"
            dangerouslySetInnerHTML={{
              __html: linkify(
                reply.message.replace(/(?:\r\n|\r|\n)/g, "<br />")
              ),
            }}
          />
        )}
        {reply.attachments.length > 0 && onShowAttachments(reply.attachments)}
      </Box>
    </Box>
  );
};

export default MailReply;

MailReply.propTypes = {
  classes: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired,
  getMailDate: PropTypes.func.isRequired,
  onShowAttachments: PropTypes.func.isRequired,
  onClickForwardMail: PropTypes.func.isRequired,
};
