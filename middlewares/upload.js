const multer = require("multer");
const path = require("path");

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

module.exports = upload;
