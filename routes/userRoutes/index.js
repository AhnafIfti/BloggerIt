const express = require("express");
const router = express.Router();
const userRegSchema = require("../../schema/userRegSchema");
const { getSignUp, postRegister } = require("../../controllers/users");
const { validateUserReg } = require("../../middleware/userValidator");

router.get("/signup", getSignUp);
router.post("/register", validateUserReg(userRegSchema), postRegister);

module.exports = router;
