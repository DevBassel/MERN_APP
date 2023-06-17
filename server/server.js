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
const path = require("path");
const port = process.env.PORT || 3000;

// DB connection and Start App
dbConnection(() => {
  app.listen(port, console.log(`server run on http://localhost:${port} ^_^`));
});

// Middleware init
app.use(express.json({ limit: "4mb" }));

app.use(express.urlencoded({ extended: false, limit: "4mb" }));

app.use(cors());

// Routes
app.use("/api", authRouter);

app.use("/api/blogs", auth, blogRouter);

app.use("/api/me", auth, userRouter);

// Handel Errors

if (process.env.NODE_ENV === "pro") {
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use(errorHandler);
