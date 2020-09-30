const Joi = require('@hapi/joi');

// register validation
const accountFormValidation = Joi.object({
    _id: Joi.optional(),
    full_name: Joi.string().min(1).required(),
    id: Joi.string().min(1).required(),
    nid: Joi.string().min(1).required(),
    blood_group: Joi.optional(),
    father_name: Joi.string().min(1).required(),
    mother_name: Joi.string().min(1).required(),
    parmanent_address: Joi.string().min(0).required(),
    present_address: Joi.string().min(0).required(),
    opening_date: Joi.date(),
    closing_date: Joi.date(),
    note: Joi.optional(),
    created_by: Joi.string().min(1).required(),
    date: Joi.string(),
});

module.exports.accountFormValidation = accountFormValidation;
