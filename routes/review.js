const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedin, isAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js")

//Reviews Post Route
router.post(
    "/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.createReview)
);

//Reviews Delete Route(For delete request)
router.delete(
    "/:reviewId",
    isLoggedin,
    isAuthor,
    wrapAsync(reviewController.destroyReview)
);

// Reviews Delete Route(For get request)
router.get(
    "/:reviewId",
    isLoggedin,
    isAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;