const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require("./config/mongodb");
const logger = require("./logger/logger");

const useRoutes = require("./Routes/userRoutes");

dotenv.config();

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASE_URI;

// instance of express
const app = express();

//middleware
app.use(express.json());
app.use(logger);

app.use("/users", useRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Сайн уу?" });
});

connectDB(databaseURL);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.magenta);
});
