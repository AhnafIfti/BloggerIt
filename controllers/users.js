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
      password: await bcrypt.hash(req.body.password, 10),
      isAdmin: false,
      isFollowing: [],
      createdAt: Date.now(),
    };
    const result = await User.create(requestBody);
    return res.status(200).json({
      success: "True",
      result: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: "False",
      error: err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  getSignUp,
  postRegister,
  getUsers,
  // makeSubscription,
  // removeSubscription,
};
