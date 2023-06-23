const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Enter the comment value"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      requierd: [true, "Enter the comment author"],
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: [true, "blog id"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
