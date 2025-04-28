const Post = require("../models/Post");
const User = require("../models/User");

const getIndex = async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };

    const postData = await Post.find().populate("createdBy");

    res.render("index", {
      localData: localData,
      postList: postData,
      searchValue: "",
      username: req.session.username ?? "",
      isLoggedIn: req.isAuthenticated(),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getSearch = async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };

    const searchValue = req.query.searchField;
    const getUsername = req.session.username;

    const searchPost = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchValue, "i") } },
        { tag: { $regex: new RegExp(searchValue, "i") } },
      ],
    }).populate("createdBy");
    res.render("index", {
      localData: localData,
      postList: searchPost,
      searchValue: searchValue,
      username: req.session.username ?? "",
      isLoggedIn: req.isAuthenticated(),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getProfile = async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };
    const user = await User.findOne({ username: req.session.username });
    const postData = await Post.find({ createdBy: user });

    req.isAuthenticated()
      ? res.render("profile", {
          localData: localData,
          postList: postData,
          author: user,
          username: req.session.username ?? "",
          isLoggedIn: req.isAuthenticated(),
        })
      : res.redirect("/login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getCreate = (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };
    req.isAuthenticated()
      ? res.render("form", {
          localData: localData,
          username: req.session.username ?? "",
          isLoggedIn: req.isAuthenticated(),
          hasData: false,
          body: {},
        })
      : res.redirect("/login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUpdate = async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };
    const result = await Post.findById(req.params.id);
    req.isAuthenticated()
      ? res.render("form", {
          localData: localData,
          username: req.session.username ?? "",
          isLoggedIn: req.isAuthenticated(),
          hasData: result ? true : false,
          body: result ?? {},
          id: req.params.id,
        })
      : res.redirect("/login");
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postEdit = async (req, res) => {
  try {
    const createdBy = await User.findOne({ username: req.session.username });
    const postBody = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      createdBy: createdBy._id,
      createdAt: Date.now(),
    };

    const paramId = req.params.id;
    if (req.isAuthenticated()) {
      const result = await Post.updateOne(
        { _id: new Object(paramId) },
        postBody
      );
      if (!result) return res.status(404).send("Post not found");
      res.redirect("/post/profile");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postSubmit = async (req, res) => {
  try {
    const createdBy = await User.findOne({ username: req.session.username });
    const postBody = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      createdBy: createdBy._id,
      createdAt: Date.now(),
    };
    if (req.isAuthenticated()) {
      const result = await Post.create(postBody);
      if (!result) return res.status(404).send("Post not found");
      res.redirect("/post");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getPostById = async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };

    let slug = req.params.id;

    const postData = await Post.findOne({ _id: slug }).populate("createdBy");
    res.render("post", {
      localData: localData,
      post: postData,
      username: req.session.username ?? "",
      isLoggedIn: req.isAuthenticated(),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getDelete = async (req, res) => {
  try {
    console.log(req.params.id);
    const paramId = req.params.id;
    if (req.isAuthenticated()) {
      const result = await Post.findByIdAndDelete(paramId);
      if (!result) return res.status(404).send("Post not found");

      res.redirect("/post/profile");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  getIndex,
  getSearch,
  getProfile,
  getCreate,
  getUpdate,
  postEdit,
  postSubmit,
  getPostById,
  getDelete,
};
