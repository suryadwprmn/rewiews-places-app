const placeSchema = require("../schemas/place");
const ErrorHandler = require("../utils/ErrorHandler");

const validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(",");
        throw new ErrorHandler(message, 400);
    } else {
        next();
    }
}

module.exports = validatePlace
