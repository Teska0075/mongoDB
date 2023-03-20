const express = require("express");

const {
  updateTravel,
  getAllTravel,
  getTravel,
  createTravel,
  deleteTravel,
} = require("../controller/travel");

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravel);

router.route("/:id").get(getTravel).post(updateTravel).delete(deleteTravel);

module.exports = router;
