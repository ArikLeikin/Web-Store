const bcrypt = require("bcryptjs");
const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Use the appropriate service here
  auth: {
    user: process.env.EMAIL_USERNAME, // Replace with your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password or App Password
  },
});

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
  let message = req.flash("error"); // m.get("error")
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
    req.flash("error", "Invalid username or password."); // m.put("error", "Invalid username or password")
    return res.redirect("/login");
  }

  const doMatch = await bcrypt.compare(password, user.password); // check
  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    console.log("Login Success");
    return req.session.save((err) => {
      if (err) console.log(err);
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
    email: req.body.email,
  });
  await user.save();
  res.redirect("/login");
  console.log("Registeration successful!");
};

exports.getResetPassword = async (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  // Need to require a reset page
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postResetPassword = async (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      req.flash(
        "error",
        "Error trying to reset password. Please try again later."
      );
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "No account with that email found.");
      return res.redirect("/reset");
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // token is valid for one hour
    await user.save();
    res.redirect("/");
    transporter.sendMail({
      to: req.body.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:8080/reset/${token}">link</a> to set a new password.</p>
      `,
    });
  });
};

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({
    resetToken: token,
    // $gt: Date.now() -> means greater than current date
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    console.log("error in reset password or token expired");
    return res.redirect("/");
  }
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/new-password", {
    path: "/new-password",
    pageTitle: "New Password",
    errorMessage: message,
    userId: user._id.toString(), // pass to place inside hidden input inside form of new password
    passwordToken: token, // pass to place inside hidden input inside form of new password
  });
};

exports.postNewPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId; // passed through hidden input inside form of new password
  const passwordToken = req.body.passwordToken; // passed through hidden input inside form of new password
  let resetUser;

  const user = await User.findOne({
    resetToken: passwordToken,
    // $gt: Date.now() -> means greater than current date
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  });
  if (!user) {
    console.log("error in passing hidden token or id");
    return res.redirect("/");
  }

  resetUser = user;
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  resetUser.password = hashedPassword; // setup new password for the user
  resetUser.resetToken = undefined; // reseting for future possible of forget password again
  resetUser.resetTokenExpiration = undefined; // reseting for future possible of forget password again
  await resetUser.save(); // store it in the db
  res.redirect("/login");
};
