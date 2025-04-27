const validatePost = (postSubmitSchema) => {
  return (req, res, next) => {
    const { error } = postSubmitSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log("Error:", error);
      return res.status(400).send(error.details.map((err) => err.message));
    }
    next();
  };
};

module.exports = { validatePost };
