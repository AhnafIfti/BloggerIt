const Post = require("../models/Post");

const isPostOwner = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("/post");
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.redirect("/post");
    }

    next();
  } catch (err) {
    console.error("Error:", err);
    res.redirect("/post");
  }
};

module.exports = { isPostOwner };
