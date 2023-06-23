import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "/api/blogs/";

export const addComment = createAsyncThunk(
  "comment/create",
  async ({ data, id }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;

      const res = await axios.post(`${API}addComment/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const res = await axios.get(`${API}getBlogComments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
