import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = process.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

export const toggleSidebarCollapsed = createAsyncThunk(
  "mailbox/toggleSidebarCollapsed",
  async (value) => {
    return value;
  }
);

export const setFilterType = createAsyncThunk(
  "mailbox/setFilterType",
  async (filterType) => {
    return filterType;
  }
);

export const getLabelsList = createAsyncThunk(
  "mailbox/getLabelsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/labels`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addNewLabel = createAsyncThunk(
  "mailbox/addNewLabel",
  async (label, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/labels`, { label });
      return label;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteLabel = createAsyncThunk(
  "mailbox/deleteLabel",
  async (labelId, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}/labels/delete`, { labelId });
      return labelId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateLabel = createAsyncThunk(
  "mailbox/updateLabel",
  async (label, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/labels`, { label });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getConnectionsList = createAsyncThunk(
  "mailbox/getConnectionsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/connections`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addNewConnection = createAsyncThunk(
  "mailbox/addNewConnection",
  async (connection, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/connections`, {
        connection,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const removeConnection = createAsyncThunk(
  "mailbox/removeConnection",
  async (connection, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/connections`, { params: { connection } });
      return connection;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getMailsList = createAsyncThunk(
  "mailbox/getMailsList",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.get(`${baseURL}/nylas/read-emails`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateMailsFolder = createAsyncThunk(
  "mailbox/updateMailsFolder",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}/mailApp/update-folder`, data);
      return data.mailIds;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateMailsLabel = createAsyncThunk(
  "mailbox/updateMailsLabel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/mailApp/update-label`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateFvrtStatus = createAsyncThunk(
  "mailbox/updateFvrtStatus",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}/mailApp/update-favorite`, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateReadStatus = createAsyncThunk(
  "mailbox/updateReadStatus",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}/mailApp/update-read`, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateImprtntStatus = createAsyncThunk(
  "mailbox/updateImprtntStatus",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}/mailApp/update-important`, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const composeMail = createAsyncThunk(
  "nylas/send-email",
  async (mail, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.post(
        `${baseURL}/nylas/send-email`,
        mail,
        config
      );
      if (getState().mailbox.filterType.selectedFolder === "sent") {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getSelectedMail = createAsyncThunk(
  "mailbox/getSelectedMail",
  async (mailId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
        params: { mailId },
      };
      const response = await axios.get(`${baseURL}/nylas/mail`, config);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateSelectedMail = createAsyncThunk(
  "mailbox/updateSelectedMail",
  async (mail, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/mail`, { mail });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const replyToMail = createAsyncThunk(
  "mailbox/replyToMail",
  async ({ id, mail }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/mail/reply`, { id, mail });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const nullifySelectedMail = createAsyncThunk(
  "mailbox/nullifySelectedMail",
  async () => {
    return null;
  }
);
