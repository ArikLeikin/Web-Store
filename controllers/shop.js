const path = require("path");
const fs = require("fs");
const Product = require("../models/product");
const Order = require("../models/order");
const Supplier = require("../models/supplier");

exports.getHomePage = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/main.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getAboutPage = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/about.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getContactPage = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/contact.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getaddressUpdate = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/addressUpdate.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getCreditCardUpdate = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/creditCardUpdate.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getProductDetails = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/product-details.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getGiftFinder = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/gift-finder.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getLogin = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/login.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getManager = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/manager.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getPayment = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/payment.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getProducts = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/products.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getQA = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/q&a.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getStatistics = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/statistics.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getSupplier = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/supplier.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getUploadYad2 = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/uploadYad2.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.uploadYad2 = async (req, res, next) => {
  const newProduct = new Product({
    title: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    image: req.body.productPhoto,
    condition: req.body.condition,
  });
};

exports.getYad2Update = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/Yad2Update.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getYourAccount = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/my-account.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// exports.postPayment = async (req, res, next) => {
//   const phone = req.body.phone;
//   const city = req.body.city;
//   const street = req.body.street;
//   const streetNumber = req.body.street_number;
//   const saveAddress = req.body.save_address; // Assuming 'save_address' is the name of the checkbox field
//   const cardNumber = req.body.card_number; // Combine card number parts if necessary
//   const cardHolder = req.body.card_holder;
//   const cardExpirationMonth = req.body.card_expiration_month;
//   const cardExpirationYear = req.body.card_expiration_year;
//   const cardCCV = req.body.card_ccv;
//   const saveCreditCard = req.body.save_credit_card;
//   const user = req.session.user;
//   const products = req.products;
//   let totalPrice = 0;
//   await products.forEach((element) => {
//     price += parseDouble(element.price);
//   });

//   const order = new Order({
//     user: user,
//     products: products,
//     total_price: totalPrice,
//     order_date: new Date(),
//     status: "Pending",
//   });
// };

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

exports.postBuyItNow = async (req, res, next) => {
  try {
    const user = req.session.user;
    const productId = req.session.productId;
    const product = Product.find(productId);
    const newOrder = new Order({
      user_info: user._id,
      products: product.id,
      total_price: product.price,
      order_date: new Date(),
      status: "Pending", // Set the initial status as desired
    });
    await newOrder.save();
    await user.push(newOrder.id);

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

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
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.postAddress = async (req, res) => {
  try {
    const user = req.session.user;
    user.address.city = req.body.city;
    user.address.street = req.body.street + req.street_number;
    user.address.country = req.body.country;
    user.address.postalCode = req.body.postalCode;
    user.save();
    res.status(200).json({
      message: "Address updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.creditCardUpdate = async (req, res) => {
  try {
    const user = req.session.user;
    user.creditCard.card_number = req.body.creditCardNumber;
    user.creditCard.card_number = req.body.creditCard;
    user.creditCard.holdr_name = req.body.card_holder; // NEED TO FIX AND ADJUST WITH FRONTEND
    user.creditCard.expiration_date = req.body.expiration_date; // NEED TO ADJUST BY FRONT
    user.creditCard.ccv = req.body.ccv;
    await user.save();
    user.res.status(200).json({
      message: "Credit card updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
