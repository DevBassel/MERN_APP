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
const {
  addComment,
  getBlogComments,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

// /api/blogs

blogRouter.post("/", addBlog);

// get delete and update blog
blogRouter.route("/:id").get(getBlogById).delete(deleteBlog).put(updateBlog);

// delete all blogs by user
blogRouter.delete("/remove/allBlogs", removeAllUserBlogs);

// bolg comments
blogRouter.post("/addComment/:id", addComment);

blogRouter.put("/updateComment/:id", updateComment);

blogRouter.delete("/deleteComment/:id", deleteComment);

blogRouter.get("/getBlogComments/:id", getBlogComments);

// Likes and DisLikes
blogRouter.put("/like/:id", blogLike);
blogRouter.put("/dislike/:id", blogDislike);

// get all likes and dislikes on blog and user status
blogRouter.get("/totalActions/:id", totalActions);

module.exports = blogRouter;
