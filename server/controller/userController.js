const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { isValidObjectId, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const perPage = 5;

// get User |  GET  |  /api/me/   |   private
const getMe = asyncHandler(async (req, res) => {
  // console.log("get user");
  res.status(200).json(req.user);
});
// get User |  GET  |  /api/me/user/:id   |   private
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const user = await User.findById(id).select("-password");
    if (user) {
      return res.json(user);
    } else throw new Error("User Not Found");
  } else throw new Error("Not Valid ID");
});
// get User |  GET  |  /api/me/blogs/:id/:page   |   private
const userBlogs = asyncHandler(async (req, res) => {
  const { id, page } = req.params;
  if (isValidObjectId(id)) {
    const blogs = await Blog.find({
      "author": new mongoose.Types.ObjectId(id),
    })
      .sort({ createdAt: "desc" })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const total = await Blog.find({
      "author": new mongoose.Types.ObjectId(id),
    }).count();

    res.json({ blogs, total, perPage });
  } else {
    throw new Error("not valid");
  }
});

// get News |  GET  |  /api/me/news/:page   |   private
const getNews = asyncHandler(async (req, res) => {
  const news = await Blog.find({ "author": { $ne: req.user._id } })
    .sort({ createdAt: "desc" })
    .skip(perPage * (req.params.page - 1))
    .limit(perPage);
  const total = await Blog.find({ "author": { $ne: req.user._id } }).count();
  res.json({ news, total, perPage });
});
const UpdateUser = asyncHandler(async (req, res) => {
  const { name, image, email, password } = req.body;
  const user = await User.findById(req.user._id);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("valid pass");
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: { name: name, email: email, image: image },
      }
    );
    const updated = await User.findById(req.user._id).select("-password");
    return res.json({
      name: `${updated.name}`,
      image: updated.image,
      email: updated.email,
    });
  } else {
    res.status(401);
    throw new Error("Not Valid Password");
  }
});

// Delete User |  DELET  |  /api/me/delete   |   private
const DelUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  if (user) {
    const blogs = await Blog.deleteMany({ "author": req.user._id });
    res.json({ user, blogs, perPage });
  }
  res.status(500);
  throw new Error("try in another time");
});

module.exports = {
  getMe,
  userBlogs,
  getNews,
  DelUser,
  getUserById,
  UpdateUser,
};
