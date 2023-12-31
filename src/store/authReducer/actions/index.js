import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = process.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

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
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
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
  },
);

export const uploadPicture = createAsyncThunk(
  "user/profile",
  async (image, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.put(
        `${baseURL}/user/profile-image`,
        formData,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.post(
        `${baseURL}/user/logout`,
        { token: localStorage.getItem("token") },
        config,
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const SetPersonalInfo = createAsyncThunk(
  "user/profile",
  async (
    { fullName, bio, programmingLanguage, schedule },
    { rejectWithValue },
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.put(
        `${baseURL}/user/profile`,
        {
          full_name: fullName,
          bio: bio,
          programming_language: programmingLanguage,
          schedule: schedule,
        },
        config,
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const updateLanguage = createAsyncThunk(
  "user/language",
  async ({ language, schedule, welcome }, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      console.log(language, schedule, welcome);
      const response = await axios.put(
        `${baseURL}/user/language`,
        { language: language, schedule: schedule, welcome: welcome },
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);
