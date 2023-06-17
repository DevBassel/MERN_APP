const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  let authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        // console.log(user);
      } else {
        throw new Error("user not found");
      }
      next();
    } catch (error) {
      console.log({ error: error.message });
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token");
  }
});

module.exports = auth;
