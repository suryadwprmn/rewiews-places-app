const Review = require("../models/Review");
const Place = require("../models/Place");


module.exports.store = async (req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const place = await Place.findById(id);
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash("success_msg", "Successfully added a new review");
    res.redirect(`/places/${id}`);
}

module.exports.destroy = async (req, res) => {
    const { id, review_id } = req.params;
    await Place.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash("success_msg", "Successfully deleted review");
    res.redirect(`/places/${id}`);
}