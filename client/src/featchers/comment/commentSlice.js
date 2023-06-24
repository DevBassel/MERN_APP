import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "./commentActions";

const initialState = {
  comments: [],
  loading: false,
  error: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentReset: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = "";
    },
    addError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: {
    [addComment.pending]: (state) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [addComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    [getPostComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteComment.pending]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state) => {
      state.loading = false;
    },
    [deleteComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateComment.pending]: (state) => {
      state.loading = true;
    },
    [updateComment.fulfilled]: (state, actions) => {
      state.loading = false;
    },
    [updateComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { commentReset, addError } = commentSlice.actions;
export default commentSlice.reducer;
