const express = require("express");

const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);

router
  .route("/:id")
  .get(getCategory)
  .post(updateCategory)
  .delete(deleteCategory);

module.exports = router;
