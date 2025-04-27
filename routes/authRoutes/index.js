const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const userLoginSchema = require("../../schema/userLoginSchema");
const { findByName } = require("../../models/User");

router.use(express.urlencoded({ extended: false }));

function validateUserLogin(userLoginSchema) {
  return (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error", error);
      return res.status(400).send(error.details.map((err) => err.message));
    }
    next();
  };
}

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error: ", err);
  }
});

// router.post(
//   "/login",
//   validateUserLogin(userLoginSchema),
//   passport.authenticate("local", {
//     successRedirect: "/post",
//     failureRedirect: "/login",
//   })
// );

router.post("/login", validateUserLogin(userLoginSchema), (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.username = user.username;
      req.session.id = user._id;
      return res.redirect("/post/profile");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      req.logout(() => {
        req.session.destroy();
        res.redirect("/login");
      });
    } else {
      console.log("User already logged out!!!");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
});

module.exports = router;
