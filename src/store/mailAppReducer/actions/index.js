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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.get(`${baseURL}/nylas/read-labels`, config);

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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.post(
        `${baseURL}/nylas/labels`,
        label,
        config
      );
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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.delete(
        `${baseURL}/nylas/labels/${labelId}`,
        config
      );
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

export const getContactsList = createAsyncThunk(
  "mailbox/getContactsList",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.get(`${baseURL}/nylas/contacts`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addNewContact = createAsyncThunk(
  "mailbox/addNewContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/contacts`, {
        contact,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const removeContact = createAsyncThunk(
  "mailbox/removeContact",
  async (contact, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/contacts`, { params: { contact } });
      return contact;
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
  async (mailIds, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.put(
        `${baseURL}/nylas/folders`,
        mailIds,
        config
      );
      return mailIds;
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
  async (mail, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
          email: JSON.parse(localStorage.getItem("user")).email,
        },
      };
      const response = await axios.post(
        `${baseURL}/nylas/reply-email`,
        mail,
        config
      );
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
