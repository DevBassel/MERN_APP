import { createSlice } from "@reduxjs/toolkit";
import { createPost, getNews, getUserPosts } from "./postActions";

const initialState = {
  posts: [],
  loading: false,
  success: false,
  error: "",
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = [];
      state.loading = false;
      state.success = false;
      state.error = "";
    },
    addError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserPosts.pending]: (state) => {
      state.loading = true;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.success = true;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getNews.pending]: (state) => {
      state.loading = true;
    },
    [getNews.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.success = true;
    },
    [getNews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset, addError } = postSlice.actions;
export default postSlice.reducer;
