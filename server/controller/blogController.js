const Blog = require("../models/Blog");
const { isValidObjectId } = require("mongoose");
const asyncHandler = require("express-async-handler");

// Get All blogs    |   GET   |   /api/blog   | private
const getBlog = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};

// Add Blog   |   POST    |   /api/blog   |   private
const addBlog = asyncHandler(async (req, res) => {
  // const { tittle, content, image } = req.body;
  try {
    // console.log(req.body);
    const blog = await Blog.create({
      ...req.body,
      author: { id: req.user._id, name: req.user.name },
    });
    // console.log(blog);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update Blog   |  PUT   |   /api/blog/:id   |   private
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (isValidObjectId(id)) {
    const blog = await Blog.findById(id);
    //  console.log(blog);
    if (blog.author.toString() === req.user._id.toString()) {
      await Blog.findByIdAndUpdate(id, { content: text });
      res.status(200).json({ sccess: true });
    } else {
      res.status(404);
      throw new Error("Blog Not Found");
    }
  } else {
    throw new Error(`[ ${id} ] isn't valid`);
  }
});

// Delete  Blog |  DELETE  |  /api/blog/:id   |   private
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const blog = await Blog.findById(id);
    //  console.log(blog);
    if (blog.author.toString() === req.user._id.toString()) {
      await Blog.findByIdAndDelete(id);
      res.status(200).json({ sccess: true });
    } else {
      res.status(404);
      throw new Error("Blog Not Found");
    }
  } else {
    throw new Error(`[ ${id} ] isn't valid`);
  }
});

module.exports = {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
};
