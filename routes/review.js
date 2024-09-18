const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/Review");
const Place = require("../models/Place");
const ReviewController = require("../controllers/reviews");

//middleware
const validateReview = require("../middlewares/validateReview");
const isValidObjectId = require("../middlewares/isValidObjectId");
const isAuth = require("../middlewares/isAuth");
const { isAuthorReview } = require("../middlewares/isAuthor");


router.post("/",isAuth,validateReview, wrapAsync(ReviewController.store));

//delete review dari tabel place dan tabel review
router.delete("/:review_id", isAuth, isAuthorReview ,isValidObjectId("/places"),wrapAsync(ReviewController.destroy));

module.exports = router;
