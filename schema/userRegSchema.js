const Joi = require("joi");

const userRegSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "string.empty": "username cannot be empty" }),
  pswd: Joi.string().min(6).required().messages({
    "string.empty": "password cannot be empty",
    "string.min": "password must have minimum 6 characters",
  }),
  email: Joi.string()
    .required()
    .messages({ "string.empty": "email cannot be empty" }),
  fullname: Joi.string()
    .required()
    .messages({ "string.empty": "fullname cannot be empty" }),
  confpswd: Joi.any()
    .valid(Joi.ref("pswd"))
    .required()
    .messages({ "any.only": "password does not match" }),
});

module.exports = userRegSchema;
