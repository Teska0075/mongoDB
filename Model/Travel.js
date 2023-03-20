const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  travelDetail: {
    type: String,
    required: true,
  },
  travelImg: {
    type: String,
  },
  travelPrice: {
    type: Number,
    required: true,
  },
  travelLocation: {
    type: String,
    required: true,
  },
  travelDay: {
    type: Number,
    required: true,
  },
});

const travel = mongoose.model("Travel", TravelSchema);

module.exports = travel;
