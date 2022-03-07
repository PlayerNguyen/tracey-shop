const express = require("express");
const CategoryController = require("../../controller/CategoryController");
const PreconditionMiddleware = require("../../utils/PreconditionMiddleware");
const router = express.Router();

router.post(
    `/`,
    PreconditionMiddleware.checkParameterBody(`name`),
    PreconditionMiddleware.checkParameterBody(`keys`),
    CategoryController.createCategory
);
router.put(
    `/:id`,
    PreconditionMiddleware.checkParameterBody(`name`),
    PreconditionMiddleware.checkParameterBody(`keys`),
    CategoryController.updateCategory
);
router.delete(`/:id`, CategoryController.deleteCategory);

router.get(`/`, CategoryController.getAllCategories);

router.get(`/:id`, CategoryController.getCategoryById);

module.exports = router;
