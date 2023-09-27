import React from "react";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CustomAvatar from "@app/components/CustomAvatar";
import CustomSummary from "@app/components/CustomSummary";
import CustomCard from "@app/components/CustomCard";
import { useDispatch } from "react-redux";
import {
  addNewConnection,
  removeConnection,
} from "@app/store/mailAppReducer/actions";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MailIcon from "@mui/icons-material/Mail";
import { alpha, useTheme } from "@mui/material/styles";

const SenderInfo = (props) => {
  const {
    showSenderInfo,
    onHideSenderInfo,
    from,
    onClickSendMail,
    isConnected,
  } = props;
  const dispatch = useDispatch();
  const theme = useTheme();

  const onClickAddContact = () => {
    if (isConnected) {
      dispatch(removeConnection(from));
    } else {
      dispatch(addNewConnection(from));
    }
  };

  return (
    <Popper
      id="mouse-over-popover"
      open={Boolean(showSenderInfo)}
      anchorEl={showSenderInfo}
      placement="top"
      sx={{
        backgroundColor: theme.palette.popupColor.main,
        cursor: "pointer",
        borderRadius: 4,
      }}
      onClose={onHideSenderInfo}
    >
      <CustomCard sx={{ backgroundColor: "transparent" }}>
        <Box p={3}>
          <CustomSummary
            avatar={
              <CustomAvatar
                size={40}
                src={from?.profile_pic}
                alt={from?.name}
              />
            }
            title={from?.name}
            subTitle={from?.email}
            showItemBadge={false}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            align={"horizontal"}
          />
        </Box>
        <Divider />

        <Box py={2} px={3} display="flex" alignItems="center">
          <Box
            component="span"
            onClick={onClickAddContact}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: isConnected
                  ? theme.palette.error.main
                  : theme.palette.success.main,
              },
            }}
          >
            {isConnected ? "Remove Contact" : "Add To Contact"}
          </Box>
          <Box ml="auto">
            <DateRangeIcon sx={{ display: "block" }} />
          </Box>
          <Box ml={1}>
            <IconButton
              onClick={() => {
                onClickSendMail({ email: from[0]?.email, name: from[0]?.name });
              }}
            >
              <MailIcon sx={{ display: "block" }} />
            </IconButton>
          </Box>
        </Box>
      </CustomCard>
    </Popper>
  );
};

export default SenderInfo;

SenderInfo.propTypes = {
  from: PropTypes.object.isRequired,
  showSenderInfo: PropTypes.bool.isRequired,
  onHideSenderInfo: PropTypes.func,
  onClickSendMail: PropTypes.func,
};
