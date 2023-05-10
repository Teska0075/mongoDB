const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const colors = require("colors");
const path = require("path");
const sendEmail = require("./utils/sendEmail");

const cloudinary = require("./utils/cloudinary");
const connectDB = require("./config/mongodb");
const logger = require("./middlewares/logger");
const upload = require("./middlewares/upload");
const error = require("./middlewares/error");

const userRoutes = require("./Routes/userRoutes");
const categoryRoute = require("./Routes/categoryRoutes");
const travelRoutes = require("./Routes/travelRoutes");

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASE_URI;

// instance of express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/category", categoryRoute);
app.use("/travel", travelRoutes);

app.post("/uploads", upload.single("image"), async (req, res) => {
  console.log("REQ", req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  res.status(200).json({
    message: "amjilttai hadgallaa",
    imgUrl: result.secure_url,
  });
});

app.get("/", async (req, res) => {
  // res.json({ message: "Сайн байна уу." });
  try {
    const r = await sendEmail(
      "Bolood bh shg bna",
      "azure.battamir.enkhtur@gmail.com",
      "lel"
    );
    console.log("RES", r);
    res.send("Hello API Sent Email");
  } catch (error) {
    console.log("ERR", error);
    res.status(400).send(error);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Сайн уу?" });
});

app.use(error);

connectDB(databaseURL);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.magenta);
});
