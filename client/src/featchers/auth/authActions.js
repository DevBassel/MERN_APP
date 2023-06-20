import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/singup", { name, email, password });

      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/login", { email, password });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message.error);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("some");
});

export const UpdataProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    try {
      const res = await axios.put(`/api/me/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message.error);
      }
    }
  }
);
