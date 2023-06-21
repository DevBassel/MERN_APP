import { createSlice } from "@reduxjs/toolkit";
import { UpdataProfile, login, logout, register } from "./authActions";

const user = JSON.parse(localStorage.getItem("user"));
const some = JSON.parse(localStorage.getItem("some"));
const initialState = {
  loading: false,
  islogin: false,
  user: user,
  some: some,
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
      state.some = [];
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
      const { token, name, email, image, id } = action.payload;
      state.loading = false;
      state.islogin = true;
      state.user = { id, token };
      state.some = { image, name, email };

      localStorage.setItem("some", JSON.stringify({ image, name, email }));
      localStorage.setItem("user", JSON.stringify({ id, token }));
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
      const { token, name, email, image, id } = action.payload;
      state.loading = false;
      state.islogin = true;
      state.user = { id, token };
      state.some = { image, name, email };

      localStorage.setItem("some", JSON.stringify({ image, name, email }));
      localStorage.setItem("user", JSON.stringify({ id, token }));
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
    [UpdataProfile.pending]: (state) => {
      state.loading = true;
    },
    [UpdataProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.some = action.payload;
      localStorage.setItem("some", JSON.stringify(action.payload));
    },
    [UpdataProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { authreset, addError } = authSlice.actions;
export default authSlice.reducer;
