require("dotenv").config();

const express = require("express");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
