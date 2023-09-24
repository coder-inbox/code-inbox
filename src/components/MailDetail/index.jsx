import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { replyToMail } from "@app/store/mailAppReducer/actions";
import MailLabels from "../MailsList/MailLabels";
import CustomSummary from "@app/components/CustomSummary";
import CustomAvatar from "@app/components/CustomAvatar";
import { getDateinDesiredFormat, isToday } from "@app/utils/dateHelper";
import Typography from "@mui/material/Typography";
import ReplyMailForm from "./ReplyMailForm";
import DetailHeader from "./DetailHeader";
import MailReply from "./MailReply";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReplyIcon from "@mui/icons-material/Reply";
import Chip from "@mui/material/Chip";
import PhotoIcon from "@mui/icons-material/Photo";
import GetAppIcon from "@mui/icons-material/GetApp";

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

const MailDetail = ({ width, onClickForwardMail }) => {
  const dispatch = useDispatch();
  const { selectedMail, labelsList } = useSelector(({ mailApp }) => mailApp);
  const theme = useTheme();

  const getSenderInfo = () => (
    <Box component="span" display="flex" alignItems="center">
      <Box component="span" fontSize={16}>
        {selectedMail.from.name}
      </Box>
      <Box
        component="span"
        fontSize={12}
        ml={2}
        color="text.secondary"
      >{`<${selectedMail.from.email}>`}</Box>
    </Box>
  );

  const onClickReplyMail = (mail) => {
    dispatch(replyToMail(selectedMail.id, mail));
  };

  const getMailDate = (date) => {
    return isToday(date) ? "Today" : getDateinDesiredFormat(date, "MMM DD");
  };

  const downloadAttachment = () => {};

  const onShowAttachments = (attachments) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {attachments.map((item, index) => (
          <Chip
            label={item.file.name}
            key={index}
            icon={<PhotoIcon />}
            deleteIcon={<GetAppIcon />}
            onDelete={downloadAttachment}
            sx={{ marginBottom: 2, marginRight: 2 }}
          />
        ))}
      </Box>
    );
  };

  const { subject, labels, from, to, date, message, replyThread, attachments } =
    selectedMail;

  return (
    <>
      <DetailHeader
        classes={classes}
        selectedMail={selectedMail}
        labelsList={labelsList}
      />

      <PerfectScrollbar style={{ flex: 1, "& > div": { height: "100%" } }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              padding: "20px 24px 16px 30px",
              borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 16,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  color: theme.palette.common.dark,
                }}
              >
                {subject}
              </Typography>
              <Box sx={{ ml: { xs: -1, sm: "auto" } }}>
                {labels.length > 0 && labelsList.length > 0 && (
                  <MailLabels mailLabels={labels} labelsList={labelsList} />
                )}
              </Box>
            </Box>

            <CustomSummary
              avatar={
                <CustomAvatar
                  size={40}
                  src={from.profile_pic}
                  alt={from.name}
                />
              }
              title={getSenderInfo()}
              subTitle={`to ${to[0].name}`}
              showItemBadge={false}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              align={"horizontal"}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              borderBottom: `1px solid ${theme.palette.borderColor.main}`,
              marginBottom: -1,
            }}
          >
            <Box sx={{ padding: "30px 24px 16px 30px", position: "relative" }}>
              <Box sx={{ paddingTop: 10, paddingBottom: 20 }}>
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
                  {getMailDate(date)}
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
                  <IconButton onClick={() => onClickForwardMail(message)}>
                    <ReplyIcon />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    mb: attachments.length > 0 ? 8 : 0,
                    p: { xs: 20, sm: 40, xl: "80%" },
                  }}
                  component="p"
                  dangerouslySetInnerHTML={{
                    __html: linkify(
                      message.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    ),
                  }}
                />

                {attachments.length > 0 && onShowAttachments(attachments)}
              </Box>
            </Box>

            {replyThread.map((reply, index) => (
              <MailReply
                key={index}
                classes={classes}
                reply={reply}
                getMailDate={getMailDate}
                onShowAttachments={onShowAttachments}
                onClickForwardMail={onClickForwardMail}
              />
            ))}
          </Box>

          <ReplyMailForm onClickReplyMail={onClickReplyMail} />
        </Box>
      </PerfectScrollbar>
    </>
  );
};

export default MailDetail;

MailDetail.propTypes = {
  onClickForwardMail: PropTypes.func,
};
