const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register |  POST  |  /api/singup  |   public
const singup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Invalid Data");
  } else {
    // if existing user
    if (await User.findOne({ email })) {
      res.status(400);
      throw new Error("this email is existing go to login");
    }
    // create user
    const user = await User.create({
      name,
      email,
      password,
      IP: req.ip,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: genToken(user._id),
    });
  }
});

// login |  POST  |  /api/login  |   public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    // check data ^_^
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        id: user._id,
        name: `${user.name}`,
        token: genToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("email or password is wrong");
    }
  }
  throw new Error("enter Email and Password");
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

module.exports = {
  singup,
  login,
};
