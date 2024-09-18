const mongoose = require("mongoose");
//mengecek url dengan id
const isValidObjectId = (redirectUrl = "/") => {
    return async (req, res, next) => {
        const paramId = ['id', 'placeId', 'reviewId'].find(param => req.params[param]);

        if(!paramId){
            return next();
        }

        const id = req.params[paramId];
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash("error_msg", "Invalid Id/ Data tidak valid");
            return res.redirect(redirectUrl);
        }
        next();
    }
};

module.exports = isValidObjectId
