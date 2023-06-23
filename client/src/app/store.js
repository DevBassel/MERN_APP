import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featchers/auth/authSlice";
import postReducer from "../featchers/posts/postSlice";
import commentReducer from "../featchers/comment/commentSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comment: commentReducer,
  },
});

export default store;
