import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./authActions";

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
    authreset: (state) => {
      state.loading = false;
      state.islogin = false;
      state.user = "";
      state.error = "";
    },
    addError: (state, { payload }) => {
      state.error = payload;
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
      state.islogin = false;
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
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.loading = false;
      state.islogin = false;
    },
  },
});

export const { authreset, addError } = authSlice.actions;
export default authSlice.reducer;
