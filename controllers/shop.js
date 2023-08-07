const path = require("path");
const fs = require("fs");
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
      const imagePath = path.join(__dirname, "..", product.image);
      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        imagePath: `data:image/jpeg;base64,${imageBase64}`,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Error on server side!");
      error.httpStatusCode = 500;
      next(error);
    });
};

exports.getCart = (req, res, next) => {
  const user = req.session.user;
  const cartData = user.cart.items;
  res.render("shop/cart", { cartItems: cartData });
};

exports.postCart = (req, res, next) => {
  const user = req.session.user;
  user.save();
  res.status(200);
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.render("shop/category", {
      products: products,
    });
  } catch (err) {
    // Handle any errors that occurred during the query or rendering
    next(err);
  }
};
