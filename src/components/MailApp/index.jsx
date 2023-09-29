import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "@app/components/AppHeader";
import Sidebar from "@app/components/Sidebar";
import MailsList from "@app/components/MailsList";
import {
  getContactsList,
  getLabelsList,
  toggleSidebarCollapsed,
} from "@app/store/mailAppReducer/actions";

import MailDetail from "@app/components/MailDetail";
import ComposeMail from "@app/components/ComposeMail";

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
    dispatch(getContactsList());
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
    dispatch(toggleSidebarCollapsed(!isSideBarCollapsed));
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
          width={isSideBarCollapsed ? 70 : 300}
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
