const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getRegister = (req, res, next) => {
  // setting a error message to display if there is one from a previous request
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  //"Need to setup the path in views"
  res.render("auth/register", {
    path: "/register",
    pageTitle: "Register",
    errorMessage: message,
  });
};

exports.getLogin = (req, res, next) => {
  // setting a error message to display if there is one from a previous request
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  //"Need to setup the path in views"
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username });
  if (!user) {
    // This is where we set the "error" to display at the next request/redirect
    req.flash("error", "Invalid username or password.");
    return res.redirect("/login");
  }

  const doMatch = await bcrypt.compare(password, user.password); // check
  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    console.log("Login Success");
    return req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  }
  // This is where we set the "error" to display at the next request/redirect
  req.flash("error", "Invalid email or password.");
  res.redirect("/login");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password != confirmPassword) {
    // This is where we set the "error" to display at the next request/redirect
    req.flash("error", "Passwords don't match.");
    return res.redirect("/register");
  }
  const userDoc = await User.findOne({ username: username });
  if (userDoc) {
    // This is where we set the "error" to display at the next request/redirect
    req.flash("error", "Username exists already, please pick a different one.");
    return res.redirect("/register");
  }

  //Need to check if to change amount of salt
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    username: username,
    password: hashedPassword,
    cart: { items: [] }, // Initialize the cart as an empty array
    phoneNumber: req.body.phoneNumber,
    address: {
      city: req.body.city,
      country: req.body.country,
      postalCode: req.body.postalCode,
      street: req.body.street,
    },
    creditCard: req.body.creditCard || null, // Use the entered creditCard if available, otherwise set to null
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    usedProducts: [], // Initialize usedProducts as an empty array
    orderHistory: [],
  });
  await user.save();
  res.redirect("/login");
  console.log("Registeration successful!");
};

exports.getResetPassword = async (req, res, next) => {
  //TODO
};

exports.postResetPassword = async (req, res, next) => {
  //TODO
};
