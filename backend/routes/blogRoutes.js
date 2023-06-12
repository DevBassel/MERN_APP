const express = require("express");
const blogRouter = express.Router();
const {
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controller/blogController");

blogRouter.route("/").get(getBlog).post(addBlog);

blogRouter.route("/:id").delete(deleteBlog).put(updateBlog);

module.exports = blogRouter;
