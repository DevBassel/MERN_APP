const express = require("express");
const { login, singup, getUser } = require("../controller/authController");
const authRouter = express.Router();

authRouter.route("/singup").post(singup);
authRouter.route("/login").post(login);

module.exports = authRouter;
