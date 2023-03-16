const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/mongodb");

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASE_URI;

// instance of express
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Сайн уу?" });
});

connectDB(databaseURL);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
