const express = require("express");
const router = express.Router();
const userRegSchema = require("../../schema/userRegSchema");
const { addUser } = require("../../controllers/users");

function validateUserReg(userRegSchema) {
  return (req, res, next) => {
    const { error } = userRegSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(400).send(error.details.map((err) => err.message));
    next();
  };
}

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
