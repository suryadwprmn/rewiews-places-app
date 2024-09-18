const Joi = require("joi");

const placeSchema = Joi.object({
    place: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
});

module.exports = placeSchema
