const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubscriptionSchema = new mongoose.Schema({
  subscriberId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
