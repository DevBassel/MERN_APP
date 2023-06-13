import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authActions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  loading: false,
  islogin: false,
  user: user,
  error: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.islogin = false;
      state.user = "";
      state.error = "";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.islogin = true;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.islogin = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
