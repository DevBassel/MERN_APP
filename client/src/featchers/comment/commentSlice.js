import { createSlice } from "@reduxjs/toolkit";
import { addComment, getPostComments } from "./commentActions";

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
  },
});

export const { commentReset, addError } = commentSlice.actions;
export default commentSlice.reducer;
