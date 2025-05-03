const express = require("express");
const router = express.Router();
const postSubmitSchema = require("../../schema/postSubmitSchema");
const { validatePost } = require("../../middleware/postValidator");
const { isPostOwner } = require("../../middleware/postOwnership");
const {
  getIndex,
  getSearch,
  getProfile,
  getCreate,
  getUpdate,
  postEdit,
  postSubmit,
  getPostById,
  getDelete,
} = require("../../controllers/posts");

router.get("/", getIndex);
router.get("/search", getSearch);
router.get("/profile", getProfile);
router.get("/create", getCreate);
router.get("/update/:id", isPostOwner, getUpdate);
router.put("/edit/:id", isPostOwner, validatePost(postSubmitSchema), postEdit);
router.delete("/delete/:id", isPostOwner, getDelete);
router.post("/submit", validatePost(postSubmitSchema), postSubmit);
router.get("/:id", getPostById);

module.exports = router;
