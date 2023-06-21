const express = require("express");
const blogRouter = express.Router();
const {
  addBlog,
  deleteBlog,
  updateBlog,
  blogLike,
  blogDislike,
  totalActions,
  removeAllUserBlogs,
  getBlogById,
} = require("../controller/blogController");

// /api/blogs

blogRouter.post("/", addBlog);

blogRouter.route("/:id").get(getBlogById).delete(deleteBlog).put(updateBlog);

blogRouter.delete("/remove/allBlogs", removeAllUserBlogs);

// Likes and DisLikes
blogRouter.put("/like/:id", blogLike);
blogRouter.put("/dislike/:id", blogDislike);
blogRouter.get("/totalActions/:id", totalActions);

module.exports = blogRouter;
