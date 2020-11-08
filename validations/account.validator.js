const Joi = require('@hapi/joi');

// register validation
const accountFormValidation = Joi.object({
    _id: Joi.optional(),
    full_name: Joi.string(),
    id: Joi.string(),
    nid: Joi.string(),
    blood_group: Joi.optional(),
    father_name: Joi.string(),
    mother_name: Joi.string(),
    parmanent_address: Joi.string(),
    present_address: Joi.string(),
    opening_date: Joi.string(),
    closing_date: Joi.string(),
    note: Joi.optional(),
    created_by: Joi.string(),
    date: Joi.string(),
});

module.exports.accountFormValidation = accountFormValidation;
