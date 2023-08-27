require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Import the 'path' module
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: "mongodb+srv://playtopia:playtopia@webstore.svlylpv.mongodb.net/",
  collection: "mySessions",
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// View engine setup (if you plan to use views)
// app.set("view engine", "ejs");
// app.set("views", "views");

// Import routes
const shopRoutes = require("./routes/shop.routes");
const connectRoutes = require("./routes/auth.routes");
const errorRoutes = require("./routes/error.routes");
const apiRoutes = require("./routes/api.routes");
const adminRoutes = require("./routes/admin.routes");

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "playtopia FOREVER",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Middleware to attach user data to request
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

// Routing setup
app.use(apiRoutes);
app.use(shopRoutes);
app.use(connectRoutes);
app.use(errorRoutes);
app.use(adminRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.redirect("/404");
});

// Connect to MongoDB and start the server
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERNAME +
      ":" +
      process.env.DB_PASSWORD +
      "@webstore.svlylpv.mongodb.net/"
  )
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
