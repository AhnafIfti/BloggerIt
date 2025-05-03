const passport = require("passport");

const getLogin = (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };
    res.render("login", {
      localData: localData,
      isLoggedIn: req.isAuthenticated(),
      messages: req.flash("error"),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.redirect("/login");
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.username = user.username;
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
