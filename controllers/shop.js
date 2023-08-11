const path = require("path");
const rootPath = path.resolve(__dirname);
const fs = require("fs");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const { error } = require("console");

exports.getHomePage = (req, res, next) => {
  const mainPage = path.join(rootPath, "..", "/public/html/main.html")
  res.status(200).sendFile(mainPage);
};

exports.getAboutPage = (req, res, next) => {
  const aboutPage = path.join(rootPath, "..", "/public/html/about.html")
  res.status(200).sendFile(aboutPage);
};

exports.getContactPage = (req, res, next) => {
  const contactPage = path.join(rootPath, "..", "/public/html/contact.html")
  res.status(200).sendFile(contactPage);
};

exports.getProduct = async (req, res, next) => {
  try{
    const prodId = req.params.productId;
    console.log(prodId)
    const product = await Product.findById(prodId)
    console.log(product)
    if(product != null)
      res.status(200).json({
        data: product,
    });
    else{
      res.status(400).json({
        "message" : "Product not found",
      })
    }
  }catch (err){
    res.status(500).json({
      message: "Internal server error"
    })
  }
};

exports.addProductToCart = async (req, res, next) => {
  try{
    const user = req.session.user;
    if(user == null){
      return res.status(401).json("Log in required")
    }
    const productToAdd = await Product.findById(req.productId)
    if(productToAdd == null){
      throw new Error("Product not found")
    }
    const cart = req.session.cart || [];
    
    // Add the product to the cart array
    cart.push(productToAdd);
    
    // Update the cart in the session
    req.session.cart = cart;
    user.cart = cart
    await user.save()

    res.status(200).json("Product added to cart successfully");
  }catch(err){
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

exports.getCart = async (req, res, next) => {
  const user = req.session.user;
  if(user == null){
    return res.status(401).json("Log in required")
  }
  const cartData = await User.findById(user.id).cart;
  console.log(cartData)
  res.status(200).json({
    data: cartData,
  })
};

exports.postCart = (req, res, next) => {
  const user = req.session.user;
  if(user == null){
    return res.status(401).json("Log in required")
  }
  user.save();
  res.status(200);
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const categoryData = await Product.find({ category: category });
    res.status(200).json({
      data: categoryData,
    })
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
};

exports.getFaq = (req, res, next)=> {
  try{
    const faqPage = path.join(rootPath, "..", "/public/html/q&a.html")
    res.status(200).sendFile(faqPage)
  }catch(err){
    res.status(500).json({
      message: "Internal server error"
    })
  }
 
}
