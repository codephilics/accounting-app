const Joi = require('@hapi/joi');

// register validation
const creditFormValidation = Joi.object({
    company: Joi.string().min(1).required(),
    coco: Joi.string().min(1).required(),
    site: Joi.string().min(1).required(),
    person: Joi.string().min(1).required(),
    department: Joi.string().min(1).required(),
    cause: Joi.string().min(1).required(),
    carrier: Joi.string().min(1).required(),
    referBy: Joi.string().min(1).required(),
    amount: Joi.number().required(), 
    otherCost: Joi.number().required(),
    total: Joi.number().required(),
    due: Joi.number().required(),
    invest: Joi.number().required(),
    note: Joi.optional(),
    editedBy: Joi.string().min(1).required(),
    file_url: Joi.optional(),
    date: Joi.date()
});

module.exports.creditFormValidation = creditFormValidation;
