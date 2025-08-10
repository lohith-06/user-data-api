const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?\d{7,15}$/).required()
});

module.exports = { userSchema };
