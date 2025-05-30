const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: false },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, required: false },
  googleId: { type: String },
  profilePicture: { type: String },
  isFollowing: [String],
});

module.exports = mongoose.model("User", UserSchema);
