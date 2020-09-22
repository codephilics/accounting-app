const Joi = require('@hapi/joi');

// register validation
const registerValidation = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});


// register validation
const loginValidation = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required()
});



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
