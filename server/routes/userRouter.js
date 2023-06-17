const express = require("express");
const {
  getUser,
  userBlogs,
  getNews,
  DelUser,
} = require("../controller/userController");

// /api/me

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/blogs/:page", userBlogs);

userRouter.get("/news/:page", getNews);

userRouter.delete("/delete", DelUser);

module.exports = userRouter;
