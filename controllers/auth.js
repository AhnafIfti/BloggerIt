const passport = require("passport");
const activeUsers = new Map();

const getLogin = (req, res) => {
  try {
    const localData = {
      title: "random",
      pageTitle: "Blog",
    };
    res.render("login", {
      localData: localData,
      isLoggedIn: req.isAuthenticated(),
      messages: req.flash("error"),
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.username = user.username;
      // return res.redirect("/post/profile");
      if (!activeUsers.has(user._id.toString())) {
        activeUsers.set(user._id.toString(), {
          sessions: new Set(),
          userInfo: {
            id: user._id.toString(),
            fullname: user.fullname,
          },
        });
      }
      activeUsers.get(user._id.toString()).sessions.add(req.sessionID);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        userId: user._id,
        test: req.isAuthenticated(),
      });
    });
  })(req, res, next);
};

const getLogout = (req, res) => {
  try {
    // if (req.isAuthenticated()) {
    const userId = req.user._id.toString();
    const userName = req.user.fullname;
    // if (activeUsers.has(userId)) {
    // activeUsers.get(userId).delete(req.sessionID);
    // if (activeUsers.get(userId).size === 0) {
    //  activeUsers.delete(userId);
    // }
    // }
    req.logout(() => {
      activeUsers.delete(userId);
      req.session.destroy();
      res.status(200).json({
        success: true,
        temp: activeUsers,
        message: "Logged out successfully",
      });
    });
    // } else {
    //   res.status(200).json({ success: true, message: "Already logged out" });
    // }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "User not authenticated" });
  }
};

const getActiveUsers = (req, res) => {
  const users = Array.from(activeUsers.values()).map((entry) => entry.userInfo);
  res.json(users);
};

module.exports = { getLogin, postLogin, getLogout, checkAuth, getActiveUsers };
