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

const makeSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const newSub = req.body.id;

    if (!newSub) {
      return res
        .status(400)
        .json({ message: "No id provided to add to tags." });
    }

    const updatedSub = [...user.isFollowing, newSub];

    const postBody = {
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      isAdmin: user.adminRole,
      isFollowing: updatedSub,
    };

    const result = await User.updateOne(
      {
        _id: new Object(req.params.id),
      },
      postBody
    );

    if (!result) {
      return res.status(404).send("Post not found");
    } else {
      return res.json({
        result: result,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const removeSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const newSub = req.body.id;

    if (!newSub) {
      return res
        .status(400)
        .json({ message: "No id provided to add to tags." });
    }

    let updatedSub = user.isFollowing || [];
    if (updatedSub.includes(newSub)) {
      updatedSub = updatedSub.filter((item) => item !== newSub);
    } else {
      return res
        .status(400)
        .json({ message: "ID not found in isFollowing list." });
    }

    const postBody = {
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      isAdmin: user.adminRole,
      isFollowing: updatedSub,
    };

    const result = await User.updateOne(
      {
        _id: new Object(req.params.id),
      },
      postBody
    );

    if (!result) {
      return res.status(404).send("Post not found");
    } else {
      return res.json({
        result: result,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  getSignUp,
  postRegister,
  getUsers,
  makeSubscription,
  removeSubscription,
};
