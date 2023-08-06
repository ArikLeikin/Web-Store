const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getRegister = (req, res, next) => {
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
    req.flash("error", "Invalid username or password.");
    return res.redirect("/login");
  }

  const doMatch = await bcrypt.compare(password, user.password); // check
  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  }
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
    req.flash("error", "Passwords don't match.");
    return res.redirect("/register");
  }
  const userDoc = await User.findOne({ username: username });
  if (userDoc) {
    req.flash("error", "Username exists already, please pick a different one.");
    return res.redirect("/register");
  }

  //Need to check if to change amount of salt
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    username: username,
    password: hashedPassword,
    orderHistory: {},
    cart: {
      items: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
    phoneNumber: req.body.phoneNumber,
    address: {
      city: req.body.address.city,
      country: req.body.address.country,
      postalCode: req.body.address.postalCode,
      street: req.body.address.street,
    },
    creditCard: req.body.creditCard, // need to check how to put only if entered
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    usedProducts: null, // need to check
  });
  user.save();
  res.redirect("/login");
  console.log("Registeration successful!");
};
