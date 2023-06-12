const mongoose = require("mongoose");

const dbConnection = async (CB) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB is connected")
    CB();
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;