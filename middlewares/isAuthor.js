//middlewares untuk mengecek apakah user yang login adalah author dari place yang dipilih
const Place = require("../models/Place");
const Review = require("../models/Review");

const isAuthorPlace = async (req, res, next) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    if(!place.author.equals(req.user._id)) {
        req.flash("error_msg", "Not authorized Place");
        return res.redirect("/places");
    }
    next();
};

const isAuthorReview = async (req, res, next) => {
    const { id, review_id } = req.params;
    const review = await Review.findById(review_id);
    if(!review.author.equals(req.user._id)) {
        req.flash("error_msg", "Not authorized Review");
        return res.redirect(`/places/${id}`);
    }
    next();
};

module.exports = { isAuthorPlace, isAuthorReview }