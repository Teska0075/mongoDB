const mongoose = require("mongoose");

const connectDB = async (databaseURL) => {
  try {
    await mongoose.connect(databaseURL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("There is an ERROR", err);
  }
};

module.exports = connectDB;
