const path = require("path");

exports.getHomePage = (req, res, next) => {
  res.render("shop/main");
};

exports.getAboutPage = (req, res, next) => {
  res.render("shop/about");
};
