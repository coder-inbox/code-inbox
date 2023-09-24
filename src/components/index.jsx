import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import MailsList from "./MailsList";
import {
  getConnectionsList,
  getLabelsList,
  toggleSidebarCollapsed,
} from "@app/store/mailAppReducer/actions";

import MailDetail from "./MailDetail";
import ComposeMail from "./ComposeMail";

const MailApp = () => {
  const dispatch = useDispatch();
  const [openComposeDialog, setOpenComposeDialog] = useState(false);
  const { isSideBarCollapsed, selectedMail } = useSelector(
    (state) => state.mailApp
  );
  const [mailTo, setMailTo] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [viewMode, setViewMode] = useState("detail");

  useEffect(() => {
    dispatch(getLabelsList());
    dispatch(getConnectionsList());
  }, [dispatch]);

  const onClickSendMail = (to) => {
    setMailTo(to);
    onOpenComposeDialog();
  };

  const onClickForwardMail = (message) => {
    setMailContent(message);
    onOpenComposeDialog();
  };

  const onOpenComposeDialog = () => {
    setOpenComposeDialog(true);
  };

  const onCloseComposeDialog = () => {
    setOpenComposeDialog(false);
    setMailContent("");
    setMailTo("");
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    dispatch(toggleSidebarCollapsed(mode !== "detail"));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow:
          "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AppHeader
        viewMode={viewMode}
        handleViewModeChange={handleViewModeChange}
      />
      <Box
        className={isSideBarCollapsed ? "collapsed" : ""}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          position: "relative",
        }}
      >
        <Sidebar
          onClickSendMail={onClickSendMail}
          onOpenComposeDialog={onOpenComposeDialog}
        />
        {selectedMail ? (
          <MailDetail onClickForwardMail={onClickForwardMail} />
        ) : (
          <MailsList
            onClickSendMail={onClickSendMail}
            onClickForwardMail={onClickForwardMail}
            viewMode={viewMode}
          />
        )}
        {openComposeDialog && (
          <ComposeMail
            openDialog={openComposeDialog}
            onCloseComposeDialog={onCloseComposeDialog}
            mailTo={mailTo}
            mailContent={mailContent}
          />
        )}
      </Box>
    </Box>
  );
};

export default MailApp;
