const express = require("express");
const { getUser, userBlogs, getNews } = require("../controller/userController");
const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/blogs/:page", userBlogs);
userRouter.get("/news/:page", getNews);
module.exports = userRouter;
