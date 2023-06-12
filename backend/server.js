require("dotenv").config();

const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const dbConnection = require("./config/DB");
const errorHandler = require("./middleware/errorHandler");
const auth = require("./middleware/auth");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

// DB connection and Start App
dbConnection(() => {
  app.listen(port, console.log(`server run on http://localhost:${port} ^_^`));
});

// Middleware init
app.use(express.json({limit: "4mb"}));
app.use(express.urlencoded({ extended: false,limit: "4mb" }));
app.use(cors());
// Routes
app.use("/api", authRouter);
app.use("/api/blogs", auth, blogRouter);
app.use("/api/me", auth, userRouter);

// Handel Errors
app.use("*", (req, res) =>
  res.status(404).json({ error: `[ ${req.baseUrl} ] Not Found :(` })
);
app.use(errorHandler);
