const bcrypt = require("bcrypt");
const User = require("../models/User");

const getSignUp = (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };

    res.render("signup", {
      localData: localData,
      messages: req.flash("error"),
      isLoggedIn: req.isAuthenticated(),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postRegister = async (req, res) => {
  try {
    const requestBody = {
      email: req.body.email,
      username: req.body.username,
      fullname: req.body.fullname,
      password: await bcrypt.hash(req.body.pswd, 10),
      adminRole: false,
      createdAt: Date.now(),
    };
    await User.create(requestBody);
    res.redirect("/login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { getSignUp, postRegister };
