const Category = require("../Model/Cateogry");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json({ message: "Categoruudiin medeelel", categories });
  } catch (error) {
    // res.status(400).json({
    //   message: "Hereglegchdiin medeelliig avahd aldaa garlaa",
    //   error: error.message,
    // });
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { title, description, categoryImg, categoryRating } = req.body;

  if (!title || !description || !categoryImg || !categoryRating) {
    res.status(400).json({ message: "Ymar negen medeelel dutuu bna" });
  }

  try {
    const category = await Category.create({
      title,
      description,
      categoryImg,
      categoryRating,
    });
    res.status(201).json({ message: "Amjilttai burtgelee", category });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      message: `${id} id-tai category oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findById(id);
    res
      .status(201)
      .json({ message: `${id} id-tai categoriin medeelel`, category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai category oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(req.body);
    res.status(201).json({
      message: `${id} id-tai categoriin medeelel amjilttai shinechlegdlee`,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: `${id} id-tai category oldsongui`,
      error: error.message,
    });
  }

  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({
      message: `${id} id-tai categoriin medeelel amjilttai USTLAA`,
      category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
