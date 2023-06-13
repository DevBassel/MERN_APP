const express = require("express");
const { getUser, userBlogs } = require("../controller/userController");
const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/blogs/:page", userBlogs);

module.exports = userRouter;
