const validateUserLogin = (userLoginSchema) => {
  return (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error", error);

      const messages = error.details.map((err) => err.message);
      req.flash("error", messages);
      return res.redirect("/login");
    }
    next();
  };
};

const validateUserReg = (userRegSchema) => {
  return (req, res, next) => {
    const { error } = userRegSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error", error);

      const messages = error.details.map((err) => err.message);
      req.flash("error", messages);
      return res.redirect("/user/signup");
    }
    next();
  };
};

module.exports = { validateUserLogin, validateUserReg };
