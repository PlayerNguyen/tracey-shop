const express = require("express");
const ImageResourceController = require("../../controller/ImageResourceController");
const MulterMiddleware = require("../../utils/MulterMiddleware");

const router = express.Router();

/**
 * POST /resources/
 * <br/>
 * Create a new resource
 */
router.post(
  `/`,
  MulterMiddleware.array(`files`, 5),
  ImageResourceController.createFile
);

/**
 * GET /resources/data/:id
 * <br/>
 * Get metadata of a resource
 */
router.get(`/data/:id`, ImageResourceController.getFileMetadata);

/**
 * GET /resources/buffer/:id
 * <br/>
 * Get a resource
 */
router.get(`/buffer/:id`, ImageResourceController.getFileBuffer);

module.exports = router;
