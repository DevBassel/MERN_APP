const { isValidObjectId } = require("mongoose");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");

// add commnt   |   POST   |    /api/blogs/addComment/:[blog ID]   |   privete
const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      author: req.user._id,
      blogId: id,
    });
    return res.json(comment);
  } else throw new Error("Not Valid ID");
});

// get all commnts for blog   |   GET   |    /api/blogs/getAllComment/:[blog ID]   |   privete
const getBlogComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const comments = await Comment.find({ blogId: id }).sort({
      createdAt: "desc",
    });
    // .skip(perPage * (req.params.page - 1))
    // .limit(perPage);

    return res.json(comments);
  } else throw new Error("Not Valid ID");
});

// delete comment   |   DELETE   |    /api/blogs/deletComment/:[comment ID]   |   privete
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const comment = await Comment.deleteOne({ _id: id });
    if (comment) return res.json(comment);
    else {
      res.status(404);
      throw new Error("Not Found");
    }
  } else throw new Error("Not Valid ID");
});

// update comment   |   PUT   |    /api/blogs/updateComment/:[comment ID]   |   privete
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (isValidObjectId(id)) {
    const comment = await Comment.updateOne({ _id: id }, { $set: { content } });
    if (comment) return res.json(comment);
    else {
      res.status(404);
      throw new Error("Not Found");
    }
  } else throw new Error("Not Valid ID");
});
module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getBlogComments,
};
