require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./models/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");
const flash = require("express-flash");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride((req) => req.query._method));
app.use(flash());

connectDB();

// Session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) return done(null, false, { message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Wrong password" });

    return done(null, user);
  })
);

// Configure GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const existingUser = await User.findOne({
            email: profile.emails?.[0]?.value,
          });

          if (existingUser) {
            existingUser.googleId = profile.id;
            existingUser.name = profile.displayName;
            existingUser.profilePicture = profile.photos?.[0]?.value || "";
            await existingUser.save();
            return done(null, existingUser);
          }

          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            fullname: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            profilePicture: profile.photos?.[0]?.value || "",
            isAdmin: false,
            isFollowing: [],
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    _id: id,
  });
  done(null, user);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));

app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/subscription", subscriptionRoutes);

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: `${process.env.CLIENT_URL}/home`,
  })
);

app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
