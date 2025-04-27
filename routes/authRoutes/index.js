const express = require("express");
const router = express.Router();
const userLoginSchema = require("../../schema/userLoginSchema");
const { validateUserLogin } = require("../../middleware/userValidator");
const { getLogin, postLogin, getLogout } = require("../../controllers/auth");

router.use(express.urlencoded({ extended: false }));

router.get("/login", getLogin);
router.post("/login", validateUserLogin(userLoginSchema), postLogin);
router.get("/logout", getLogout);

module.exports = router;
