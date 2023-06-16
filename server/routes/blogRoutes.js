const express = require("express");
const blogRouter = express.Router();
const {
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
  blogLike,
  blogDislike,
  totalActions,
  ifUser,
} = require("../controller/blogController");

// /api/blogs

blogRouter.route("/").get(getBlog).post(addBlog);
blogRouter.route("/:id").delete(deleteBlog).put(updateBlog);

// Likes and DisLikes
blogRouter.post("/like/:id", blogLike);
blogRouter.post("/dislike/:id", blogDislike);
blogRouter.get("/totalActions/:id", totalActions);
blogRouter.get("/ifuser/:id", ifUser);


module.exports = blogRouter;
