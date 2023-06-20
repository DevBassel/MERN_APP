const express = require("express");
const {
  getMe,
  userBlogs,
  getNews,
  DelUser,
  getUserById,
  UpdateUser,
} = require("../controller/userController");

// /api/me

const userRouter = express.Router();

userRouter.get("/", getMe);

userRouter.get("/users/:id", getUserById);

userRouter.get("/blogs/:id/:page", userBlogs);

userRouter.get("/news/:page", getNews);

userRouter.put("/update", UpdateUser);

userRouter.delete("/delete", DelUser);

module.exports = userRouter;
