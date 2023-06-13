const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({
    error: err.message,
    // stack: process.env.APP_STATUS === "Production" ? "null" : err.stack,
  });
};

module.exports = errorHandler;
