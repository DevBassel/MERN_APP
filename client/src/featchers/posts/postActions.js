import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "/api/";

export const createPost = createAsyncThunk(
  "posts/create",
  async (data, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const response = await axios.post(API_URL + "blogs", data, config);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (page, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL + `me/blogs/${page}`, {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getNews = createAsyncThunk(
  "posts/news",
  async (page, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`api/me/news/${page}`, {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const res = await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      if (error.response || error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
