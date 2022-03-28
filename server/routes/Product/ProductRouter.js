const express = require("express");
const ProductController = require("../../controller/ProductController");
const AuthMiddleware = require("../../utils/AuthMiddleware");
const router = express.Router();

/**
 * POST /products/
 * <br/>
 * Creates a new product
 */
router.post(
  `/`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.createProduct
);

/**
 * PUT /products/:id
 * <br/>
 * Updates a product
 */
router.put(
  `/:id`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.updateProduct
);

/**
 * DELETE /products/:id
 * <br/>
 * Deletes a product
 */
router.delete(
  `/:id`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.deleteProduct
);

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
/**
 * POST /products/:id/comments
 * <br/>
 * Adds a comment to a product
 */
router.post(
  `/:id/comments`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.createComment
);
/**
 * PUT /products/:id/comments/:commentId
 * <br/>
 * Updates a comment
 */
router.put(
  `/:productId/comments/:commentId`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.updateComment
);
/**
 * DELETE /products/:id/comments/:commentId
 * <br/>
 *  Deletes a comment
 */
router.delete(
  `/:productId/comments/:commentId`,
  AuthMiddleware.forciblyRequireAuth,
  ProductController.deleteComment
);
module.exports = router;
