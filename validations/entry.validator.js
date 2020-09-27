const Joi = require('@hapi/joi');

// register validation
const entryFormValidation = Joi.object({
    _id: Joi.optional(),
    type: Joi.string().valid("Debit","Credit").required(),
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
    dena: Joi.number().required(),
    paona: Joi.number().required(),
    vara: Joi.number().required(),
    warning: Joi.number().required(),
    note: Joi.optional(),
    editedBy: Joi.string().min(1).required(),
    date: Joi.date()
});

module.exports.entryFormValidation = entryFormValidation;
