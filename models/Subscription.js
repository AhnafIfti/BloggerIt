const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  subscriberId: { type: String, required: true },
  targetUserId: { type: String, required: true },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
