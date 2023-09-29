import React, { useState } from "react";
import CustomAvatar from "@app/components/CustomAvatar";
import Box from "@mui/material/Box";
import CustomMedia from "@app/components/CustomMedia";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import SenderInfo from "../MailsList/SenderInfo";

const ContactCell = ({ item, onClickSendMail }) => {
  const theme = useTheme();
  const [showSenderInfo, setShowSenderInfo] = useState(null);
  const isOnline = item.status === 1;

  const onShowSenderInfo = (event) => {
    setShowSenderInfo(event.currentTarget);
  };

  const onHideSenderInfo = () => {
    setShowSenderInfo(null);
  };

  return (
    <>
      <Box
        onMouseEnter={onShowSenderInfo}
        onMouseLeave={onHideSenderInfo}
        sx={{
          position: "relative",
          padding: "5px 20px",
          transition: "all 0.3s ease",
          "& .custom-media-object": {
            alignItems: "center",
          },
          "& .custom-media-image": {
            marginRight: 4,
          },
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <CustomMedia
          avatarPos="center"
          avatar={
            <CustomAvatar size={40} src={item.profile_pic} alt={item.name} />
          }
          title={item.name}
          titleProps={{
            variant: "h4",
            component: "div",
            sx: {
              fontSize: 14,
              letterSpacing: 0.1,
              transition: "all 0.3s ease",
              opacity: 1,
              visibility: "visible",
              whiteSpace: "nowrap",
            },
          }}
          subTitle={
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                color: theme.palette.text.disabled,
                letterSpacing: 0.4,
              }}
            >
              <Box
                component="span"
                sx={{
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  backgroundColor: isOnline ? "green" : "red",
                }}
                className="dot-status"
              />
              <Box
                component="span"
                sx={{
                  marginLeft: 5,
                  transition: "all 0.3s ease",
                  opacity: 1,
                  visibility: "visible",
                  whiteSpace: "nowrap",
                }}
                className="sub-title-text"
              >
                {isOnline ? "Online" : "Offline"}
              </Box>
            </Typography>
          }
          subTitleProps={{ style: { marginBottom: 16 } }}
        />

        <SenderInfo
          showSenderInfo={showSenderInfo}
          from={item}
          isConnected={true}
          onHideSenderInfo={onHideSenderInfo}
          onClickSendMail={onClickSendMail}
        />
      </Box>
    </>
  );
};

export default ContactCell;

ContactCell.propTypes = {
  openDialog: PropTypes.object.isRequired,
};
