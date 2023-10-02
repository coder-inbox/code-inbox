import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MailCell from "./MailCell";
import CustomList from "@app/components/CustomList";
import { getMailsList } from "@app/store/mailAppReducer/actions";
import ListHeader from "./ListHeader";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import ListEmptyResult from "@app/components/ListEmptyResult";
import EmptyMailsResult from "./EmptyMailsResult";

const MailsList = ({
  width,
  onClickSendMail,
  onClickForwardMail,
  viewMode,
}) => {
  const dispatch = useDispatch();
  const { loading, mailsList, labelsList } = useSelector(
    ({ mailApp }) => mailApp
  );
  const [checkedMails, setCheckedMails] = useState([]);
  const totalMails = mailsList.length;
  const theme = useTheme();

  useEffect(() => {
    dispatch(getMailsList());
  }, [dispatch]);

  const onChangeCheckedMails = (isChecked, id) => {
    if (isChecked) {
      setCheckedMails([...checkedMails, id]);
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {totalMails > 0 && (
        <ListHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
        />
      )}
      {totalMails === 0 && <Box sx={{ height: 39 }} />}
      <PerfectScrollbar
        style={{
          flex: "1 1 auto",
          ".CustomListEmptyResult": {
            border: "0 none",
            borderRadius: 0,
            backgroundColor: "transparent",
          },
        }}
      >
        <CustomList
          data={mailsList}
          renderRow={(item, index) => (
            <MailCell
              key={index}
              mail={item}
              labelsList={labelsList}
              checkedMails={checkedMails}
              onChangeCheckedMails={onChangeCheckedMails}
              onClickSendMail={onClickSendMail}
              onClickForwardMail={onClickForwardMail}
              viewMode={viewMode}
            />
          )}
          ListEmptyComponent={
            <ListEmptyResult loader={loading.getMailsList}>
              <EmptyMailsResult />
            </ListEmptyResult>
          }
        />
      </PerfectScrollbar>
    </Box>
  );
};

export default MailsList;

MailsList.propTypes = {
  onClickSendMail: PropTypes.func,
  onClickForwardMail: PropTypes.func,
  viewMode: PropTypes.string,
};

MailsList.defaultProps = {
  viewMode: "detail",
};
