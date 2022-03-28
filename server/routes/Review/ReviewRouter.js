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

router.put(
  `/:reviewId`,
  AuthMiddleware.forciblyRequireAuth,
  ReviewController.updateReview
);
router.delete(
  `/:reviewId`,
  AuthMiddleware.forciblyRequireAuth,
  ReviewController.deleteReview
);
module.exports = router;
