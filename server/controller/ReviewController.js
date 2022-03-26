const ReviewModel = require("../model/ReviewModel");
const Language = require("../utils/Language");
const MiddlewareError = require("../utils/MiddlewareError");

async function createReview(req, res, next) {
  try {
    const { product, rating, reviewDetail } = req.body;
    const { _id: user } = req.userData;
    const lastReview = await ReviewModel.findOne({ user, product });

    // Existed last review on database
    if (lastReview) {
      return next(new MiddlewareError(500, Language.Response.AlreadyReview));
    }

    const review = await ReviewModel.create({
      user,
      product,
      rating,
      reviewDetail,
    });

    res.status(200).json(review);
  } catch (error) {
    return next(error);
  }
}

async function getReviewById(req, res, next) {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ product: productId })
      .populate("user", "-password -__v")
      .populate("product", "-__v");
    res.status(200).json(reviews);
  } catch (error) {
    return next(error);
  }
}

const ReviewController = {
  createReview,
  getReviewById,
};
module.exports = ReviewController;
