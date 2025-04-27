const express = require("express");
const router = express.Router();
const userRegSchema = require("../../schema/userRegSchema");
const { addUser } = require("../../controllers/users");
const {
  validateUserReg,
} = require("../../controllers/validators/userValidator");

router.get("/signup", async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Random Title",
    };

    res.render("signup", { localData: localData });
  } catch (err) {
    console.log("Error: ", err);
  }
});

router.post("/register", validateUserReg(userRegSchema), async (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Random Title",
    };
    await addUser(req.body);
    res.redirect("/login");
  } catch (err) {
    console.log("Error: ", err);
  }
});

module.exports = router;
