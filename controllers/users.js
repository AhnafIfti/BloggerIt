const bcrypt = require("bcrypt");

const User = require("../models/User");

async function findUserByName(username) {
  const user = await User.findOne({ username: username });
  return user;
}

async function findUserById(id) {
  const user = await User.findOne({
    _id: id,
  });
  return user;
}

const getSignUp = (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Random Title",
    };

    res.render("signup", { localData: localData });
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

module.exports = { findUserById, findUserByName, getSignUp, postRegister };
