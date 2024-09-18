const reviewSchema = require("../schemas/review");
const ErrorHandler = require("../utils/ErrorHandler");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(",");
        throw new ErrorHandler(message, 400);
    } else {
        next();
    }
}

module.exports = validateReview