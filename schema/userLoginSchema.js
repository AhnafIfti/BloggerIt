const Joi = require("joi");

const userLoginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "string.empty": "username cannot be empty" }),
  password: Joi.string().required().messages({
    "string.empty": "password cannot be empty",
  }),
});

module.exports = userLoginSchema;
