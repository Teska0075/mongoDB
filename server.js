const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const colors = require("colors");
const path = require("path");

const connectDB = require("./config/mongodb");
const logger = require("./logger/logger");
const cloudinary = require("./utils/cloudinary");

const error = require("./middlewares/error");

const userRoutes = require("./Routes/userRoutes");
const categoryRoute = require("./Routes/categoryRoutes");
const travelRoutes = require("./Routes/travelRoutes");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("FILE", file);
    const fileExt = path.extname(file.originalname);
    const fileName = Math.floor(Math.random() * 1_000_000).toString(16);
    console.log(`FN`, fileName);
    cb(null, `${fileName}${fileExt}`);
  },
});
const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASE_URI;

// instance of express
const app = express();

//middleware
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

app.get("/", (req, res) => {
  res.json({ message: "Сайн уу?" });
});

app.use(error);

connectDB(databaseURL);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.magenta);
});
