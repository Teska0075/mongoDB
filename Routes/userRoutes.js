const express = require("express");

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
} = require("../controller/user");

const router = express.Router();

router.route("/login").post(login);

router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").get(getUser).post(updateUser).delete(deleteUser);

module.exports = router;
