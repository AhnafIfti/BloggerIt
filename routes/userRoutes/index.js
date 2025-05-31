const express = require("express");
const router = express.Router();
const userRegSchema = require("../../schema/userRegSchema");
const {
  getSignUp,
  postRegister,
  getUsers,
  // makeSubscription,
  // removeSubscription,
} = require("../../controllers/users");
const { validateUserReg } = require("../../middleware/userValidator");

router.get("/signup", getSignUp);
router.post("/register", postRegister);
router.get("/list", getUsers);
// router.put("/subscribe/:id", makeSubscription);
// router.put("/unsubscribe/:id", removeSubscription);

module.exports = router;
