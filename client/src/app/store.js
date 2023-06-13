import { configureStore} from "@reduxjs/toolkit";
import authReducer from "../featchers/auth/authSlice";
import postReducer from "../featchers/posts/postSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export default store;
