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

async function updateReview(req, res, next) {
  try {
    const { reviewId } = req.params;

    const currentReview = await ReviewModel.findOne({ _id: reviewId });
    if (!currentReview) {
      return next(new MiddlewareError(404, Language.Response.NotFound));
    }

    // Not signed in yet
    if (!req.userData) {
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    // Not owner of review
    const user = req.userData;
    if (!user._id != currentReview.user) {
      // Unauthorized
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    const { rating, reviewDetail } = req.body;
    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { rating, reviewDetail },
      { new: true }
    );
    res.status(200).json(review);
  } catch (error) {
    return next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const { reviewId } = req.params;

    const currentReview = await ReviewModel.findOne({ _id: reviewId });
    if (!currentReview) {
      return next(new MiddlewareError(404, Language.Response.NotFound));
    }

    // Not signed in yet
    if (!req.userData) {
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    // Not owner of review
    const user = req.userData;
    if (!user._id != currentReview.user || !user.admin) {
      // Unauthorized
      return next(new MiddlewareError(401, Language.Response.Unauthorized));
    }

    await ReviewModel.findByIdAndDelete(reviewId);
    res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
}

const ReviewController = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
};
module.exports = ReviewController;
