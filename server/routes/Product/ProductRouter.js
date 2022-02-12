const express = require("express");
const ProductController = require("../../controller/ProductController");
const router = express.Router();

/**
 * POST /products/
 * <br/>
 * Creates a new product
 */
router.post(`/`, ProductController.createProduct);

/**
 * PUT /products/:id
 * <br/>
 * Updates a product
 */
router.put(`/:id`, ProductController.updateProduct);

/**
 * DELETE /products/:id
 * <br/>
 * Deletes a product
 */
router.delete(`/:id`, ProductController.deleteProduct);

/**
 * GET /products/
 * <br/>
 * Retrieves all products
 */
router.get(`/`, ProductController.getAllProducts);

/**
 * GET /products/:id
 * <br/>
 *  Retrieves a product by its id
 */
router.get(`/:id`, ProductController.getProductById);

module.exports = router;
