const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    with: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      required: [true, "Plese enter a post image: "],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
