const CategoryModel = require("../model/CategoryModel");

/**
 * Creates new category.
 */
async function createCategory(req, res, next) {
  try {
    const { name, keys } = req.body;
    const category = await CategoryModel.create({ name, keys });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves all categories in database.
 */
async function getAllCategories(req, res, next) {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

/**
 * Updates a category.
 */
async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, keys } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(id, { name, keys });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves a category by its id.
 */
async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findOne({ _id: id });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
};
module.exports = CategoryController;
