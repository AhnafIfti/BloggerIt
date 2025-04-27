const Joi = require("joi");

const userRegSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "title cannot be empty" }),
  content: Joi.string().required().messages({
    "string.empty": "content cannot be empty",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = userRegSchema;
