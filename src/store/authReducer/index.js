import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./actions";

import storage from "redux-persist/lib/storage";
// initialize token from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  currentUser: null,
  token: token,
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
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
    builder.addCase(registerUser.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "";
    });
  },
});

export const { logout, setUser } = authReducer.actions;

export default authReducer.reducer;
