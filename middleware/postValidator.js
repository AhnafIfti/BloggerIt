const validatePost = (postSubmitSchema) => {
  return (req, res, next) => {
    const { error } = postSubmitSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log("Error:", error);

      const messages = error.details.map((err) => err.message);
      req.flash("error", messages);
      console.log(req.url);
      if (req.url === "/submit") {
        return res.redirect("/post/create");
      } else if (req.url.startsWith("/edit")) {
        return res.redirect(`/post/update/${req.params.id}`);
      } else {
        return res.redirect("/");
      }
    }
    next();
  };
};

module.exports = { validatePost };
