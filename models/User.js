const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  isAdmin: { type: Boolean, required: false },
});

module.exports = mongoose.model("User", UserSchema);
