const validateUserLogin = (userLoginSchema) => {
  return (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error", error);
      return res.status(400).send(error.details.map((err) => err.message));
    }
    next();
  };
};

const validateUserReg = (userRegSchema) => {
  return (req, res, next) => {
    const { error } = userRegSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(400).send(error.details.map((err) => err.message));
    next();
  };
};

module.exports = { validateUserLogin, validateUserReg };
