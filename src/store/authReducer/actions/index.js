import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, nylas }, { rejectWithValue }) => {
    try {
      let data = await nylas.authWithRedirect({
        emailAddress: email,
        successRedirectUrl: "",
      });
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userGetToken = createAsyncThunk(
  "user/get-token",
  async ({ nylas }, { rejectWithValue }) => {
    try {
      nylas.exchangeCodeFromUrlForToken().then((data) => {
        const response = JSON.parse(data);
        if (response?.user) {
          localStorage.setItem("user", JSON.stringify(response?.user));
          localStorage.setItem("token", JSON.stringify(response?.token));
        }
        return response?.user;
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
