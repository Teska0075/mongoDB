const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500, "Tailbar hamgiin ihdee 500 tem degtees ihgui baina"],
  },
  categoryImg: {
    type: String,
  },
  categoryRating: Number,
});

const category = mongoose.model("Category", CategorySchema);

module.exports = category;
