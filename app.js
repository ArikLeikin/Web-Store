require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://playtopia:playtopia@webstore.svlylpv.mongodb.net/"
);

const shopRoutes = require("./routes/shop.routes");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

// for each request the session is added to the request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  //res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(shopRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
