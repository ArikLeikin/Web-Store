require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/playtopia",
  collection: "mySessions",
});
mongoose.connect(
  "mongodb+srv://playtopia:playtopia@webstore.svlylpv.mongodb.net/"
);

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

//routes
const shopRoutes = require("./routes/shop.routes");

//middleware for each request
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "nightwayne",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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
