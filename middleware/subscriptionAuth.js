const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Not authenticated" });
};

module.exports = { ensureAuthenticated };
