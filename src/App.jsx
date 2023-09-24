import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@app/store/authReducer/actions";
import MailApp from "@app/components";

function App() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(userLogin({ email: "test", password: "test" }));
  };

  return (
    <>
      <MailApp />
    </>
  );
}

export default App;
