import React, { useState } from "react";
import CustomAvatar from "@app/components/CustomAvatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import {
  getSelectedMail,
  updateFvrtStatus,
  updateMailsFolder,
} from "@app/store/mailAppReducer/actions";
import MailLabels from "./MailLabels";
import Typography from "@mui/material/Typography";
import { formatPreviewDate } from "@app/utils/dateHelper";
import SenderInfo from "./SenderInfo";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";

const MailCell = ({
  mail,
  labelsList,
  checkedMails,
  onChangeCheckedMails,
  onClickSendMail,
  onClickForwardMail,
  viewMode,
}) => {
  const dispatch = useDispatch();
  const [showSenderInfo, setShowSenderInfo] = useState(null);

  const onShowSenderInfo = (event) => {
    setShowSenderInfo(event.currentTarget);
  };

  const onHideSenderInfo = () => {
    setShowSenderInfo(null);
  };

  const onGetMailDetail = () => {
    dispatch(getSelectedMail(mail.messages[0].id));
  };

  const onMoveMail = (folder) => {
    dispatch(updateMailsFolder([mail.id], folder));
  };

  const onClickFavoriteIcon = (status) => {
    dispatch(updateFvrtStatus([mail.id], status));
  };
  const getMailDate = (date) => {
    return formatPreviewDate(new Date(Math.floor(date * 1000)), true);
  };
  const from = mail.messages[0]?.from;
  const subject = mail.messages[0]?.subject;
  const snippet = mail.messages[0]?.snippet;
  const read = mail.messages[0]?.read;
  const date = mail.messages[0]?.date ?? "";
  const starred = mail.messages[0]?.starred;
  const { labels } = mail;

  return (
    <Box
      sx={{
        transition: "all .2s",
        color: (theme) => theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        padding: "16px 24px 16px 18px",
        width: { lg: "100%", md: "90%", sm: "90%" },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:not(:first-child)": {
          borderTop: (theme) => `1px solid ${theme.palette.borderColor.main}`,
        },
        "&:hover": {
          transform: "translateY(-4px)",
          backgroundColor: (theme) => theme.palette.primary.main + "0.04",
          boxShadow: (theme) =>
            `0 3px 10px 0 ${theme.palette.common.dark + "0.2"}`,
          "& $titleRoot": {
            color: (theme) => theme.palette.text.secondary,
          },
          "& $mailCellTimeAction": {
            opacity: 0,
            visibility: "hidden",
          },
          "& $mailCellBtnAction": {
            opacity: 1,
            visibility: "visible",
            width: "100%",
          },
        },
        "&.itemRead": {
          backgroundColor: (theme) => theme.palette.primary.main + "0.04",
          "& $titleRoot": {
            color: (theme) => theme.palette.text.secondary,
          },
        },
        "&.selected": {
          backgroundColor: (theme) => theme.palette.primary.main + "0.1",
          "& $titleRoot": {
            color: (theme) => theme.palette.text.secondary,
          },
        },
        [(theme) => theme.breakpoints.up("sm")]: {
          flexDirection: "row",
          alignItems: "center",
        },
        [(theme) => theme.breakpoints.down("xs")]: {
          paddingLeft: 6,
        },
      }}
      onClick={onGetMailDetail}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          [(theme) => theme.breakpoints.up("sm")]: {
            width: "calc(100% - 170px)",
          },
          [(theme) => theme.breakpoints.up("xl")]: {
            width: "calc(100% - 260px)",
          },
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Checkbox
          color="primary"
          checked={checkedMails.includes(mail.id)}
          onChange={(event) =>
            onChangeCheckedMails(event.target.checked, mail.id)
          }
          sx={{
            mr: { xs: 2, md: 4 },
            [(theme) => theme.breakpoints.up("md")]: {
              mr: 6,
            },
          }}
        />
        <Box
          sx={{
            width: "calc(100% - 46px)",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={onShowSenderInfo}
          onMouseLeave={onHideSenderInfo}
          sx={{
            [(theme) => theme.breakpoints.up("md")]: {
              width: "calc(100% - 58px)",
            },
          }}
        >
          <CustomAvatar
            size={viewMode === "detail" ? 56 : 40}
            src={from?.profile_pic}
            alt={from?.name}
            sx={{
              [(theme) => theme.breakpoints.down("xs")]: {
                display: "none",
              },
              "& .custom-avatar-size": {
                [(theme) => theme.breakpoints.down("sm")]: {
                  width: 40,
                  height: 40,
                },
              },
            }}
          />
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              [(theme) => theme.breakpoints.down("xs")]: {
                display: "none",
              },
            }}
          >
            <SenderInfo
              showSenderInfo={showSenderInfo}
              from={from}
              onHideSenderInfo={onHideSenderInfo}
              onClickSendMail={onClickSendMail}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "calc(100% - 80px)",
            [(theme) => theme.breakpoints.down("sm")]: {
              width: "calc(100% - 64px)",
            },
            [(theme) => theme.breakpoints.down("xs")]: {
              width: "100%",
            },
          }}
        >
          {viewMode === "detail" && (
            <Typography
              sx={{
                fontSize: 12,
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {from?.name}
            </Typography>
          )}
          <Typography
            component="div"
            variant="h4"
            sx={{
              marginBottom: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {subject ? subject : "No subject"}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
              fontSize: 14,
              fontWeight: (theme) => theme.typography.fontWeightBold,
            }}
          >
            {snippet}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          [(theme) => theme.breakpoints.up("sm")]: {
            marginLeft: 8,
            width: 160,
            justifyContent: "flex-end",
          },
          [(theme) => theme.breakpoints.up("xl")]: {
            width: 250,
          },
          [(theme) => theme.breakpoints.down("xs")]: {
            justifyContent: "flex-end",
          },
        }}
      >
        {labels.length > 0 && labelsList.length > 0 && (
          <MailLabels mailLabels={labels} labelsList={labelsList} />
        )}
        <Box
          component="span"
          sx={{
            fontWeight: (theme) => theme.typography.fontWeightBold,
            textTransform: "capitalize",
            marginLeft: 10,
          }}
        >
          {getMailDate(date)}
        </Box>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            transition: "all 0.5s ease",
            opacity: 0,
            visibility: "hidden",
            width: 0,
            overflow: "hidden",
            "& .icon-btn": {
              padding: 6,
              marginLeft: 4,
              "& .MuiCheckbox-root": {
                padding: 0,
              },
            },
          }}
        >
          <Tooltip title="Archive">
            <IconButton
              className="icon-btn"
              onClick={() => onMoveMail("archived")}
              sx={{ marginLeft: 4 }}
            >
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              className="icon-btn"
              onClick={() => onMoveMail("trash")}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Forward">
            <IconButton
              className="icon-btn"
              onClick={() => onClickForwardMail(snippet)}
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Favorite">
            <IconButton
              className="icon-btn"
              sx={{ "& .MuiCheckbox-root": { padding: 0 } }}
            >
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon sx={{ color: "#FF8C00" }} />}
                checked={starred}
                onChange={(e) => onClickFavoriteIcon(e.target.checked)}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default MailCell;

MailCell.propTypes = {
  mail: PropTypes.object.isRequired,
  labelsList: PropTypes.array.isRequired,
  checkedMails: PropTypes.array.isRequired,
  onChangeCheckedMails: PropTypes.func,
  onClickSendMail: PropTypes.func,
  onClickForwardMail: PropTypes.func,
  viewMode: PropTypes.string,
};

MailCell.defaultProps = {
  viewMode: "detail",
};
