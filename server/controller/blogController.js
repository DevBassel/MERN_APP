const Blog = require("../models/Blog");
const { isValidObjectId, default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

// Get  blogs with user id    |   GET   |   /api/blog   | private

// Add Blog   |   POST    |   /api/blog   |   private
const addBlog = asyncHandler(async (req, res) => {
  const { tittle, content, image, img } = req.body;
  try {
    // console.log(req.body);
    const blog = await Blog.create({
      tittle,
      content,
      image,
      author: req.user._id,
    });
    // console.log(blog);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get Blog   |   GET    |   /api/blog/:id   |   private
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    return res.json(blog);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

// Update Blog   |  PUT   |   /api/blog/:id   |   private
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { tittle, content, image } = req.body;
  if (isValidObjectId(id)) {
    const blog = await Blog.findById(id);
    //  console.log(blog);
    if (blog.author.toString() === req.user._id.toString()) {
      await Blog.findByIdAndUpdate(id, {
        $set: { tittle, content, image },
      });
      
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
  console.log(id);
  if (isValidObjectId(id)) {
    const blog = await Blog.findById(id);
    //  console.log(blog);
    if (blog) {
      if (blog.author.id.toString() === req.user._id.toString()) {
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ sccess: true });
      }
    } else {
      res.status(404);
      throw new Error("Blog Not Found");
    }
  } else {
    throw new Error(`[ ${id} ] isn't valid`);
  }
});

// Like  Blog |  POST  |  /api/blog/like/:id   |   private
const blogLike = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  if (isValidObjectId(blogId)) {
    const blog = await Blog.findById(blogId);
    // console.log(blog);
    if (blog) {
      if (!blog.usersLikes.includes(req.user._id)) {
        await Blog.findByIdAndUpdate(blogId, {
          $push: { usersLikes: req.user._id },
          $pull: { usersDisLikes: req.user._id },
        });
        // return res.json({ success: true, msg: "like add" });
      } else {
        await Blog.findByIdAndUpdate(blogId, {
          $pull: { usersLikes: req.user._id },
        });
      }
      return res.json({ success: true });
    }
  } else {
    res.status(400);
    throw new Error("enter valid id");
  }
  res.status(404);
  throw new Error("Not found");
});

// disLike  Blog |  POST  |  /api/blog/dislike/:id   |   private
const blogDislike = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  if (isValidObjectId(blogId)) {
    const blog = await Blog.findById(blogId);
    // console.log(blog);
    if (blog) {
      if (!blog.usersDisLikes.includes(req.user._id)) {
        await Blog.findByIdAndUpdate(blogId, {
          $push: { usersDisLikes: req.user._id },
          $pull: { usersLikes: req.user._id },
        });
        // return res.json({ success: true, msg: "dis like add" });
      } else {
        await Blog.findByIdAndUpdate(blogId, {
          $pull: { usersDisLikes: req.user._id },
        });
        // return res.json({ success: true, msg: "dislike removed" });
      }
      return res.json({ success: true });
    }
  } else {
    res.status(400);
    throw new Error("enter valid id");
  }
  res.status(404);
  throw new Error("Not found");
});

// total likes and dislikes  Blog |  POST  |  /api/blog/dislike/:id   |   private
const totalActions = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  if (isValidObjectId(blogId)) {
    const blog = await Blog.findById(blogId);
    if (blog) {
      let useris = "none";
      if (blog.usersLikes.includes(req.user._id)) {
        useris = "like";
      }
      if (blog.usersDisLikes.includes(req.user._id)) {
        useris = "dislike";
      }

      return res.json({
        likes: blog.usersLikes.length,
        disLikes: blog.usersDisLikes.length,
        useris,
      });
    }
  } else {
    res.status(400);
    throw new Error("enter valid id");
  }
  res.status(404);
  throw new Error("Not found");
});

const removeAllUserBlogs = asyncHandler(async (req, res) => {
  const task = await Blog.deleteMany({ author: req.user._id });

  res.json(task);
});

module.exports = {
  updateBlog,
  addBlog,
  deleteBlog,
  blogLike,
  blogDislike,
  totalActions,
  removeAllUserBlogs,
  getBlogById,
};
