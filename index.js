require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./models/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const User = require("./models/User");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");
const flash = require("express-flash");

const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
