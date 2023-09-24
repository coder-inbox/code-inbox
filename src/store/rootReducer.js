import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@app/store/authReducer";
import mailAppReducer from "@app/store/mailAppReducer";

export const combinedReducer = combineReducers({
  auth: authReducer,
  mailApp: mailAppReducer,
});
