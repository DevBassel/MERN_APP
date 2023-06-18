import { createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, getNews, getUserPosts } from "./postActions";

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
    postreset: (state) => {
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
    [deletePost.pending]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deletePost.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});
export const { postreset, addError } = postSlice.actions;
export default postSlice.reducer;
