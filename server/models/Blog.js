const mongoose = require("mongoose");

// const commentSchema = mongoose.Schema({
//   author: {
//     type: Object,
//     ref: "User",
//   },
//   content: {
//     type: String,
//     require: [true, "add comment content"],
//   },
// });

const blogSchema = mongoose.Schema(
  {
    author: {
      type: Object,
      ref: "User",
      required: [true, "add author"],
    },
    content: {
      type: String,
      required: [true, "Plese enter a post value: "],
    },
    tittle: {
      type: String,
      required: [true, "Plese enter a post value: "],
    },
    image: {
      type: String,
    },
    usersLikes: {
      type: Array,
      default: [],
    },
    usersDisLikes: {
      type: Array,
      default: [],
    },
    // comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
