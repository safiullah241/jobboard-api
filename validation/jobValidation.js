const Joi = require("joi");

const jobSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    company: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
    salary: Joi.number().min(0).required(),
    category: Joi.string().min(2).max(50).required()
});

module.exports = {
    jobSchema
};