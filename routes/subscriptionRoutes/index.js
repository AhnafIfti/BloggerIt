const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/subscriptionAuth");
const {
  getSubscribe,
  getUnsubscribe,
} = require("../../controllers/subscriptions");

router.post("/subscribe", ensureAuthenticated, getSubscribe);
router.post("/unsubscribe", ensureAuthenticated, getUnsubscribe);

module.exports = router;
