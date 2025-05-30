const express = require("express");
const router = express.Router();
const userLoginSchema = require("../../schema/userLoginSchema");
const { validateUserLogin } = require("../../middleware/userValidator");
const {
  getLogin,
  postLogin,
  getLogout,
  checkAuth,
  getActiveUsers,
} = require("../../controllers/auth");

router.use(express.urlencoded({ extended: false }));

router.get("/login", getLogin);
router.post("/login", validateUserLogin(userLoginSchema), postLogin);
router.get("/logout", getLogout);
router.get("/check-auth", checkAuth);
router.get("/active-users", getActiveUsers);

module.exports = router;
