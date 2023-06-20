const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "plase enter a name"],
      unique: [true, "this name is existing"],
    },
    email: {
      type: String,
      required: [true, "plase enter an email"],
      unique: [true, "this email is existing"],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "plase enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  // console.log(this.password, hash);
  this.password = hash;
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
