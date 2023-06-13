const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

const getUser = asyncHandler(async (req, res) => {
  // console.log("get user");
  res.status(200).json(req.user);
});

const userBlogs = asyncHandler(async (req, res) => {
  const perPage = 4;
  const blogs = await Blog.find({ with: req.user._id })
    .sort({ createdAt: "desc" })
    .skip(perPage * (req.params.page - 1))
    .limit(perPage);

  const total = await Blog.find({ with: req.user._id }).count();

  res.status(200).json({ blogs, total });
});

module.exports = {
  getUser,
  userBlogs,
};
