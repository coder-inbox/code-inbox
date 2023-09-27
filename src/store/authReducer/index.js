import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userGetToken } from "./actions";

import storage from "redux-persist/lib/storage";
// initialize token from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  currentUser: null,
  token: token,
  auth_url: null,
  error: null,
  success: false,
  message: "",
};

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.loading = false;
      state.currentUser = null;
      state.token = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.auth_url = action.payload.auth_url;
      state.message = action.payload.message;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "Network Error";
    });
    builder.addCase(userGetToken.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(userGetToken.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      // TODO: fix this
      state.currentUser = JSON.parse(localStorage.getItem("user"));
      // state.message = action.payload.message;
    });
    builder.addCase(userGetToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "An error has occurred!";
    });
  },
});

export const { logout, setUser } = authReducer.actions;

export default authReducer.reducer;
