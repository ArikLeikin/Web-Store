const path = require("path");
const rootPath = path.resolve(__dirname);
const fs = require("fs");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

exports.getHomePage = (req, res, next) => {
  const mainPage = path.join(rootPath, "..", "/public/html/main.html");
  res.status(200).sendFile(mainPage);
};

exports.getAboutPage = (req, res, next) => {
  const aboutPage = path.join(rootPath, "..", "/public/html/about.html");
  res.status(200).sendFile(aboutPage);
};

exports.getContactPage = (req, res, next) => {
  const contactPage = path.join(rootPath, "..", "/public/html/contact.html");
  res.status(200).sendFile(contactPage);
};
exports.getPayment = (req, res, next) => {
  const paymentPage = path.join(rootPath, "..", "/public/html/payment.html");
  res.status(200).sendFile(paymentPage);
};

exports.postPayment = async (req, res, next) => {
  try {
    req.session.user = await User.find({ username: "admin" }).populate(
      "cart.items.product"
    ); // FIND -> RETURNS ARRAY!
    req.session.user = req.session.user[0];
    const user = req.session.user;
    const cartItems = user.cart.items;
    console.log(cartItems);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total_price = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    console.log(total_price);

    const newOrder = new Order({
      user_info: user._id,
      products: cartItems.map((item) => item.product._id),
      total_price,
      order_date: new Date(),
      status: "Pending", // Set the initial status as desired
    });

    await newOrder.save();

    // Clear the user's cart in the session or the database
    user.cart.items = [];

    await user.save();
    req.session.user = user;
    req.session.cart = { items: [] };
    await req.session.save();
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find(); // Retrieve all products from the database
//     res.status(200).json(products); // Send the products as a JSON response
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getProduct = async (req, res, next) => {
//   try {
//     const prodId = req.params.productId;
//     console.log(prodId);
//     const product = await Product.findById(prodId);
//     console.log(product);
//     if (product != null)
//       res.status(200).json({
//         data: product,
//       });
//     else {
//       res.status(400).json({
//         message: "Product not found",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

exports.addProductToCart = async (req, res, next) => {
  try {
    const user = req.session.user;
    if (user == null) {
      return res.status(401).json("Log in required");
    }
    const productToAdd = await Product.findById(req.body.productId);
    if (productToAdd == null) {
      throw new Error("Product not found");
    }
    const cart = req.session.cart || [];

    // Add the product to the cart array
    cart.push(productToAdd);

    // Update the cart in the session
    req.session.cart = cart;
    user.cart = cart;
    await user.save();

    res.status(200).json("Product added to cart successfully");
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCart = async (req, res, next) => {
  const user = req.session.user;
  const cart = req.session.cart || user.cart;
  if (user == undefined) {
    return res.status(401).json("Log in required");
  }
  if (cart.items.length === 0) return res.status(401).json("Cart is Empty");
  console.log(cart.items);
  res.status(200).json({
    data: cart.items,
  });
};

exports.postCartAdd = async (req, res, next) => {
  try {
    // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
    // req.session.user = req.session.user[0];  --> For testing
    const productIdToSave = req.body.productId;
    const quantityToSave = parseInt(req.body.quantity);
    if (quantityToSave <= 0)
      return res.status(400).json({ message: "Non positive quantity" });
    const user = req.session.user;
    const cart = req.session.cart !== undefined ? req.session.cart : user.cart;
    if (cart.items.length > 0) {
      const existingCartItem = cart.items.find(
        (item) => item.product.toString() === productIdToSave
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantityToSave;
      } else {
        cart.items.push({
          product: productIdToSave,
          quantity: quantityToSave,
        });
      }
    } else {
      cart.items.push({
        product: productIdToSave,
        quantity: quantityToSave,
      });
    }
    req.session.user.cart = cart;
    req.session.cart = cart;
    await req.session.save();
    await user.save();
    res.status(200).json({ message: "Product added successfully to cart!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding product to cart!" });
  }
};

exports.postCartDelete = async (req, res, next) => {
  // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
  // req.session.user = req.session.user[0]; --> For testing

  const productId = req.body.productId;
  const user = req.session.user;
  const cart = req.session.cart !== undefined ? req.session.cart : user.cart;

  try {
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItemIndex !== -1) {
      cart.items.splice(cartItemIndex, 1); // Remove the item from the cart
      user.cart.items.splice(cartItemIndex, 1);
      req.session.user.cart = cart;
      req.session.cart = cart;
      // Save changes to both the user and the session
      await user.save();
      await req.session.save();
      return res.status(200).json({ message: "Product removed from cart" });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.updateCartProductQuantity = async (req, res, next) => {
  // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
  // req.session.user = req.session.user[0]; --> For testing
  const productId = req.body.productId;
  const newQuantity = parseInt(req.body.quantity);
  const user = req.session.user;
  const cart = req.session.cart !== undefined ? req.session.cart : user.cart;

  try {
    const cartItem = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItem != -1) {
      cart.items[cartItem].quantity = newQuantity;
      req.session.user.cart = cart;
      req.session.cart = cart;
      await user.save(); // Save changes to the database
      await req.session.save();
      return res.status(200).json({ message: "Cart item quantity updated" });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = req.body.category;
    const categoryData = await Product.find({ category: category });
    res.status(200).json({
      data: categoryData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getFaq = (req, res, next) => {
  try {
    const faqPage = path.join(rootPath, "..", "/public/html/q&a.html");
    res.status(200).sendFile(faqPage);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSuppplierPage = (req, res, next) => {
  try {
    const supplierPage = path.join(
      rootPath,
      "..",
      "/public/html/supplier.html"
    );
    res.status(200).sendFile(supplierPage);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.submitSuplliersItem = async (req, res, next) => {
  try {
    const supplier = req.session.user;
    if (supplier == null) {
      return res.status(401).json("Log in required");
    }
    if (supplier.permission != "supplier") {
      return res.status(401).json("Not a supplier");
    }

    const {
      title,
      price,
      description,
      condition,
      category,
      manufacture_date,
      quantity,
      age_range_from,
      age_range_to,
    } = req.body;

    const image = req.file ? req.file.path : ""; // Retrieve the image path from req.file

    const newProduct = new Product({
      title,
      price,
      description,
      image,
      condition: "New",
      category,
      manufacture_date,
      supplier,
      quantity,
      age_range: {
        from: age_range_from,
        to: age_range_to,
      },
    });

    supplier.availableProducts.push(newProduct);
    const savedProduct = await supplier.save();

    res.status(201).json({
      message: "Product submitted successfully",
      product: savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getYad2 = async (req, res) => {
  try {
    const yad2Page = path.join(rootPath, "..", "/public/html/uploadYad2.html");
    res.status(200).sendFile(yad2Page);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.submitYad2 = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
