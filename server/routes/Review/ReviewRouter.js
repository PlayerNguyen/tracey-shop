const express = require("express");
const ReviewController = require("../../controller/ReviewController");
const router = express.Router();
const AuthMiddleware = require("../../utils/AuthMiddleware");

router.post(
  `/`,
  AuthMiddleware.forciblyRequireAuth,
  ReviewController.createReview
);
router.get(
  `/:productId`,
  AuthMiddleware.forciblyRequireAuth,
  ReviewController.getReviewById
);

module.exports = router;
