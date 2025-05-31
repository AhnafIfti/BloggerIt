const Subscription = require("../models/Subscription");
const User = require("../models/User");

const addSubscriber = async (userId, targetId) => {
  const user = await User.findById(userId);
  const newSub = targetId;

  const updatedSub = [...user.isFollowing, newSub];

  const postBody = {
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    password: user.password,
    createdAt: user.createdAt,
    isAdmin: user.adminRole,
    isFollowing: updatedSub,
  };

  await User.updateOne(
    {
      _id: new Object(userId),
    },
    postBody
  );
};

const getSubscribe = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const subscriberId = req.user._id.toString();
    const existingSub = await Subscription.findOne({
      subscriberId: subscriberId,
      targetUserId: targetUserId,
    });
    if (existingSub) {
      return res
        .status(400)
        .json({ success: false, message: "Already subscribed" });
    }

    await Subscription.create({
      subscriberId: subscriberId,
      targetUserId: targetUserId,
    });
    addSubscriber(subscriberId, targetUserId);
    res.status(200).json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const removeSubscriber = async (userId, targetId) => {
  const user = await User.findById(userId);
  const newSub = targetId;

  let updatedSub = user.isFollowing || [];
  if (updatedSub.includes(newSub)) {
    updatedSub = updatedSub.filter((item) => item !== newSub);
  }

  const postBody = {
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    password: user.password,
    createdAt: user.createdAt,
    isAdmin: user.adminRole,
    isFollowing: updatedSub,
  };

  await User.updateOne(
    {
      _id: new Object(userId),
    },
    postBody
  );
};

const getUnsubscribe = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const subscriberId = req.user._id.toString();
    const result = await Subscription.findOneAndDelete({
      subscriberId: subscriberId,
      targetUserId: targetUserId,
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }
    removeSubscriber(subscriberId, targetUserId);
    res
      .status(200)
      .json({ success: true, message: "Unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getSubscribe,
  getUnsubscribe,
};
