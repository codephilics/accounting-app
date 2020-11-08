const Joi = require('@hapi/joi');

// register validation
const entryFormValidation = Joi.object({
    _id: Joi.optional(),
    type: Joi.string().valid("Debit","Credit"),
    // company: Joi.string(),
    // coco: Joi.string(),
    // site: Joi.string(),
    // person: Joi.string(),
    // department: Joi.string(),
    // cause: Joi.string(),
    // carrier: Joi.string(),
    // referBy: Joi.string(),
    // amount: Joi.optional(), 
    // otherCost: Joi.number().optional(),
    // total: Joi.number().optional(),
    // dena: Joi.number().optional(),
    // paona: Joi.number().optional(),
    // vara: Joi.number().optional(),
    // warning: Joi.number().optional(),
    // note: Joi.optional(),
    // editedBy: Joi.string(),
    // date: Joi.string(),
});

module.exports.entryFormValidation = entryFormValidation;
