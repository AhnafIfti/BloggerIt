const express = require("express");
const router = express.Router();
const postSubmitSchema = require("../../schema/postSubmitSchema");
const { validatePost } = require("../../middleware/postValidator");
const {
  getIndex,
  getSearch,
  getProfile,
  getCreate,
  getUpdate,
  postEdit,
  postSubmit,
  getPostById,
} = require("../../controllers/posts");

router.get("/", getIndex);
router.get("/search", getSearch);
router.get("/profile", getProfile);
router.get("/create", getCreate);
router.get("/update/:id", getUpdate);
router.post("/edit/:id", validatePost(postSubmitSchema), postEdit);
router.post("/submit", validatePost(postSubmitSchema), postSubmit);
router.get("/:id", getPostById);

module.exports = router;
