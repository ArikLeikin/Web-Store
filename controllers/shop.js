const path = require("path");

const Product = require("../models/product");
const Order = require("../models/order");

exports.getHomePage = (req, res, next) => {
  res.render("shop/main");
};

exports.getAboutPage = (req, res, next) => {
  res.render("shop/about");
};

exports.getContactPage = (req, res, next) => {
  res.render("shop/about");
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Error on server side!");
      error.httpStatusCode = 500;
      next(error);
    });
};
