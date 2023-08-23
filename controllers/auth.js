const bcrypt = require("bcryptjs");
const User = require("../models/user");
const path = require("path");
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
  try {
    const registerPath = path.join(__dirname, "../public/html/register.html");
    res.status(200).sendFile(registerPath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error loading register" });
  }
};

exports.getLogin = (req, res, next) => {
  // setting a error message to display if there is one from a previous request
  try {
    const loginPath = path.join(__dirname, "../public/html/login.html");
    res.status(200).sendFile(loginPath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error loading login" });
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      //req.session.permission = user.permission;
      await req.session.save();
      return res.status(200).json({ message: "Login success." });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.postRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //const confirmPassword = req.body.confirmPassword;
  console.log(req.body);
  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      cart: { items: [] }, // Initialize the cart as an empty array
      phoneNumber: req.body.phoneNumber,
      address: {
        city: req.body.city || null,
        country: req.body.country || null,
        postalCode: req.body.postalCode || null,
        street: req.body.street || null,
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
    return res.status(200).redirect("/login"); //if register successful -> redirect to login screen
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

exports.getResetPassword = async (req, res, next) => {
  try {
    const resetPagePath = path.join(__dirname, "../public/html/reset.html");
    res.status(200).sendFile(resetPagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error loading reset page" });
  }
};

exports.postResetPassword = async (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error in creating random bytes" });
    }
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //req.flash("error", "No account with that email found.");
      return res.status(400).json({ message: "Email already exists." });
      // return res.redirect("/reset");
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // token is valid for one hour
    await user.save();
    res.status(200).json({ message: "Sent to email link to reset password" });
    transporter.sendMail({
      to: req.body.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Enter the token to the reset form at the following link:  <a href="http://localhost:${process.env.PORT}/new-password">Reset Password</a></p>
        <p>token: ${token} </p>
      `,
    });
  });
};

exports.getNewPassword = async (req, res, next) => {
  try {
    const resetPasswordPagePath = path.join(
      __dirname,
      "../public/html/new-password.html"
    );
    return res.status(200).sendFile(resetPasswordPagePath);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error sending html file" });
  }
};

exports.postNewPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const newPasswordConfirm = req.body.passwordConfirm;
  if (newPassword != newPasswordConfirm) {
    return res.status(400).json({ message: "Passwords don't match." });
  }
  //const userId = req.body.userId; // passed through hidden input inside form of new password
  const token = req.body.token;
  const user = await User.findOne({
    resetToken: token,
    // $gt: Date.now() -> means greater than current date
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    console.log("error in reset password or token expired");
    return res
      .status(400)
      .json({ message: "error in reset password or token expired." });
  }

  let resetUser = user;
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  resetUser.password = hashedPassword; // setup new password for the user
  resetUser.resetToken = undefined; // reseting for future possible of forget password again
  resetUser.resetTokenExpiration = undefined; // reseting for future possible of forget password again
  await resetUser.save(); // store it in the db
  res.redirect("/login");
};
