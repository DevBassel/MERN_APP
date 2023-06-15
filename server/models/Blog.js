const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
