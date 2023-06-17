const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/User");

// get User |  GET  |  /api/me/   |   private
const getUser = asyncHandler(async (req, res) => {
  // console.log("get user");
  res.status(200).json(req.user);
});

// get User |  GET  |  /api/me/blogs/:page   |   private
const userBlogs = asyncHandler(async (req, res) => {
  const perPage = 4;
  const blogs = await Blog.find({ "author.id": req.user._id })
    .sort({ createdAt: "desc" })
    .skip(perPage * (req.params.page - 1))
    .limit(perPage);

  const total = await Blog.find({ "author.id": req.user._id }).count();

  res.status(200).json({ blogs, total });
});

// get News |  GET  |  /api/me/news/:page   |   private
const getNews = asyncHandler(async (req, res) => {
  const perPage = 4;
  const news = await Blog.find({ "author.id": { $ne: req.user._id } })
    .sort({ createdAt: "desc" })
    .skip(perPage * (req.params.page - 1))
    .limit(perPage);
  const total = await Blog.find({ "author.id": { $ne: req.user._id } }).count();
  res.json({ news, total });
});

// Delete User |  DELET  |  /api/me/delete   |   private
const DelUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  if (user) {
    const blogs = await Blog.deleteMany({ "author.id": req.user._id });
    res.json({ user, blogs });
  }
  res.status(500);
  throw new Error("try in another time");
});

module.exports = {
  getUser,
  userBlogs,
  getNews,
  DelUser,
};
