const passport = require("passport");

const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postLogin = (req, res, next) => {
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
};

const getLogout = (req, res) => {
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
};

module.exports = { getLogin, postLogin, getLogout };
