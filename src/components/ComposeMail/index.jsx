import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import SendIcon from "@mui/icons-material/Send";
import { composeMail } from "@app/store/mailAppReducer/actions";
import FilePicker from "@app/components/FilePicker";
import AppTextInput from "@app/components/AppTextInput";
import { isValidEmail } from "@app/components/Helper";
import CustomCard from "@app/components/CustomCard";
import CustomCardContent from "@app/components/CustomCardContent";
import CustomCardHeader from "@app/components/CustomCardHeader";
import EmojiPicker from "@app/components/MailDetail/EmojiPicker";
import { alpha, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const ComposeMail = ({
  openDialog,
  onCloseComposeDialog,
  mailTo,
  mailContent,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [to, setTo] = useState(mailTo ? [mailTo] : []);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(mailContent ? mailContent : "");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [minimise, setMinimise] = useState(false);
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [toError, setToError] = useState("");
  const [ccError, setCcError] = useState("");
  const [bccError, setBccError] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setMessage(html);
  }, [editorState]);

  const dialogWidth = {
    xs: "90%",
    sm: "60%",
    md: "60%",
  };

  const getHeaderTitle = () => (
    <Box display="flex" alignItems="center">
      <EditIcon />
      <Box
        component="span"
        fontSize={{ xs: 20, sm: 16, md: 16, lg: 18 }}
        fontWeight="bold"
        m={2}
      >
        Compose Message
      </Box>
    </Box>
  );

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

  const addTo = () => {
    if (email.trim()) {
      setTo([...to, { name: "Receiver name", email }]);
      setEmail("");
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      addTo();
    }
  };

  const filterTo = (email) => {
    const updatedList = to.filter((item) => item.email !== email);
    setTo(updatedList);
    setToError("");
  };

  const onPickEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const onDiscardMail = () => {
    onCloseComposeDialog();
  };

  const checkValidations = () => {
    if (to.length === 0) {
      setToError("Required");
    } else if (!to.every((item) => isValidEmail(item.email))) {
      setToError("Invalid email");
    } else if (cc && !isValidEmail(cc)) {
      setCcError("Invalid email");
    } else if (bcc && !isValidEmail(bcc)) {
      setBccError("Invalid email");
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const mail = {
      to,
      cc,
      bcc,
      subject,
      message,
      attachments,
    };
    dispatch(composeMail(mail));
    onCloseComposeDialog();
  };

  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={() => onCloseComposeDialog()}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -40%)",
        zIndex: 1,
        height: "75%",
        width: 840,
        transition: "all 0.3s ease",
        ...(openDialog && {
          bottom: "0 !important",
        }),
        [theme.breakpoints.up("sm")]: {
          width: 480,
        },
        [theme.breakpoints.up("xs")]: {
          width: 280,
        },
        [theme.breakpoints.up("md")]: {
          width: 700,
        },
        [theme.breakpoints.up("xl")]: {
          height: "550px",
          width: 820,
        },
      }}
    >
      <CustomCard
        sx={{
          overflowY: "auto",
          height: "100%",
          transition: "all 0.3s ease",
          backgroundColor: theme.palette.popupColor.main,
          borderRadius: 0,
          boxShadow:
            "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
          "&.card-minimise": {
            transform: "translateY(calc(100% - 66px))",
          },
        }}
      >
        <CustomCardHeader
          title={getHeaderTitle()}
          sx={{
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            color: theme.palette.common.white,
            padding: "9px 24px",
            position: "relative",
            justifyContent: "space-between",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: alpha(theme.palette.common.black, 0.4),
            },
            "& > *": {
              position: "relative",
              zIndex: 3,
            },
          }}
        >
          <Box alignItems="right">
            <IconButton
              onClick={onDiscardMail}
              sx={{
                float: 0,
                color: theme.palette.common.white,
                [theme.breakpoints.down("xs")]: {
                  padding: 12,
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                },
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </CustomCardHeader>
        <CustomCardContent
          sx={{
            paddingTop: 12,
          }}
        >
          <Box
            style={{
              height: 380,
              marginRight: -24,
              paddingRight: 24,
            }}
          >
            <Box height={1} display="flex" flexDirection="column">
              <Box mb={3} width="1">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                    "& .to-input-type": {
                      marginBottom: -2,
                      "& .MuiInput-underline:before": {
                        borderBottom: "0 none",
                      },
                    },
                    "& .MuiChip-root": {
                      marginRight: 8,
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      marginRight: 5,
                    }}
                  >
                    To
                  </Box>
                  {to.length > 0 &&
                    to.map((item, index) => (
                      <Chip
                        label={item.email}
                        color={
                          isValidEmail(item.email) ? "default" : "secondary"
                        }
                        onDelete={() => filterTo(item.email)}
                        key={index}
                      />
                    ))}
                  <AppTextInput
                    className="to-input-type"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setToError("");
                    }}
                    helperText={toError}
                    required
                    onKeyDown={onKeyPress}
                    onBlur={() => addTo()}
                    sx={{
                      color: theme.palette.text.primary,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                      },
                    }}
                  />
                  <Box
                    component="span"
                    ml={4}
                    className="pointer"
                    color="text.secondary"
                    onClick={() => setShowCc(!showCc)}
                    sx={{
                      "&.pointer": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Cc
                  </Box>
                  <Box
                    component="span"
                    ml={4}
                    className="pointer"
                    color="text.secondary"
                    onClick={() => setShowBcc(!showBcc)}
                    sx={{
                      "&.pointer": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Bcc
                  </Box>
                </Box>
              </Box>
              {showCc && (
                <Box mb={3} width="1">
                  <AppTextInput
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">CC</InputAdornment>
                      ),
                    }}
                    value={cc}
                    onChange={(e) => {
                      setCc(e.target.value);
                      setCcError("");
                    }}
                    helperText={ccError}
                    sx={{
                      color: theme.palette.text.primary,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                      },
                    }}
                  />
                </Box>
              )}
              {showBcc && (
                <Box mb={3} width="1">
                  <AppTextInput
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">BCC</InputAdornment>
                      ),
                    }}
                    value={bcc}
                    onChange={(e) => {
                      setBcc(e.target.value);
                      setBccError("");
                    }}
                    helperText={bccError}
                    sx={{
                      color: theme.palette.text.primary,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                      },
                      "& .MuiInput-underline:before": {
                        borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                      },
                    }}
                  />
                </Box>
              )}
              <Box mb={3} width="1">
                <AppTextInput
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  sx={{
                    color: theme.palette.text.primary,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
                  },
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />

                <Box mt={10}>
                  {attachments.length > 0 && (
                    <Box
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                      mb={2}
                    >
                      {attachments.map((item, index) => (
                        <Box mr={2} mb={2} key={index}>
                          <Chip
                            label={item.file.name}
                            onDelete={() => onDeleteAttachments(item.id)}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Box mt="auto" display="flex" alignItems="center">
                    <Box ml={2} sx={{ ml: 2 }}>
                      <EmojiPicker onPickEmoji={onPickEmoji} />
                    </Box>
                    <Box ml={2} sx={{ ml: 2 }}>
                      <FilePicker onAddAttachments={onAddAttachments} />
                    </Box>
                    <Box>
                      <Tooltip title="Delete">
                        <IconButton onClick={onDiscardMail}>
                          <DeleteIcon
                            sx={{
                              color: theme.palette.text.primary,
                              backgroundColor: theme.palette.background.paper,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={checkValidations}
                      sx={{
                        ml: "auto",
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
            </Box>
          </Box>
        </CustomCardContent>
      </CustomCard>
    </Dialog>
  );
};

ComposeMail.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  onCloseComposeDialog: PropTypes.func,
  mailTo: PropTypes.object,
  mailContent: PropTypes.string,
};

ComposeMail.defaultProps = {
  mailTo: null,
  mailContent: "",
};

export default ComposeMail;
