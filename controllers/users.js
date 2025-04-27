const bcrypt = require("bcrypt");

const User = require("../models/User");

async function addUser(requestBody) {
  const body = {
    email: requestBody.email,
    username: requestBody.username,
    fullname: requestBody.fullname,
    password: await bcrypt.hash(requestBody.pswd, 10),
    adminRole: false,
    createdAt: Date.now(),
  };
  await User.create(body);
}

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

module.exports = { findUserById, addUser, findUserByName };
