const path = require("path");
const fs = require("fs");
const Product = require("../models/product");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { log } = require("console");

//C:\Users\BooM\Desktop\School\WebDEV\WebStore\WebStore\public
//C:\Users\BooM\Desktop\School\WebDEV\WebStore\public

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Use the appropriate service here
  auth: {
    user: process.env.EMAIL_USERNAME, // Replace with your Gmail email address
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password or App Password
  },
});

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
  const file = path.join(__dirname, "../public/html/address-update.html");
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

exports.getProductUpdate = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/product-update.html");
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

exports.getCartPage = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/cart.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

exports.getWishlistPage = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/wishlist.html");
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
  try {
    const image = req.files["image[]"];
    const user = await User.findById(req.session.user._id);
    const newProduct = new Product({
      quantity: 1,
      category: "yad2",
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: image.map((image) => image.path.split("public")[1]),
      condition: req.body.condition,
      added_date: new Date(),
      age_range: req.body.age_range,
    });
    await newProduct.save();
    user.usedProducts.push(newProduct);
    await user.save();
    req.session.user = user;
    await req.session.save();

    res.status(200).json({ message: "Upload success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
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

exports.postYad2Update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.title = req.body.title;
    product.condition = req.body.condition;
    product.price = req.body.price;
    product.age_range = req.body.age_range;
    product.description = req.body.description;
    const image = JSON.parse(JSON.stringify(req.files))["image[]"];
    if (image !== undefined) {
      product.image = image.map((image) => image.path.split("public")[1]);
    }
    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
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

exports.postContact = (req, res, next) => {
  try {
    transporter.sendMail({
      to: process.env.EMAIL_USERNAME,
      from: req.body.email,
      subject: `Contact ${req.body.name}`,
      // Need to check
      html: `
        <p>${req.body.message},</p>
      `,
    });
    res.status(200).json({ message: "Sent mail successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error on server side" });
  }
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
    // req.session.user = await User.find({ username: "admin" }).populate(
    //   "cart.items.product"
    // ); // FIND -> RETURNS ARRAY!
    // req.session.user = req.session.user[0];
    const user = await User.findById(req.session.user._id).populate(
      "cart.items.product"
    );
    const users = await User.find();

    const cartItems = user.cart.items;

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const yad2Products = cartItems.filter(
      (item) => item.product.category.toString() === "yad2"
    );
    // for (let i = 0; i < yad2Products.length; i++) {
    //   const userToModify = users.find((someUser) =>
    //     someUser.usedProducts.contains(yad2Products[i].product._id)
    //   );
    //   const index = array.indexOf(yad2Products[i].product._id);
    //   userToModify.usedProducts.slice(index, 1);
    // }

    yad2Products.forEach((yad2Product) => {
      const userToModify = users.find((someUser) =>
        someUser.usedProducts.includes(yad2Product.product._id)
      );
      const index = userToModify.usedProducts.indexOf(yad2Product.product._id);
      userToModify.usedProducts.splice(index, 1);
    });

    let total_price = 0;
    for (let i = 0; i < cartItems.length; i++) {
      // let singleItem = await Product.findById(
      //   cartItems[i].product.toHexString()
      // );
      let singleItem = await Product.findById(cartItems[i].product._id);
      total_price += singleItem.price * cartItems[i].quantity;
      //console.log("single item= " + singleItem);
      //console.log("cart item[i]= " + cartItems[i]);
      singleItem.quantity -= cartItems[i].quantity;
      //console.log("Single Item quantity = ", singleItem.quantity);
      const productId = singleItem._id.toString();
      //console.log(productId);
      for (let i = 0; i < users.length; i++) {
        let currUser = users[i];
        if (currUser._id.toString() === user._id.toString()) continue;
        let currUserWishList = currUser.wishlist;
        let currUserCart = currUser.cart;
        let ifSave = false;
        //console.log(currUser);
        for (let j = 0; j < currUserWishList.length; j++) {
          if (
            singleItem.quantity === 0 &&
            currUserWishList[j].product.toString() === productId
          ) {
            currUserWishList.splice(j, 1);
            ifSave = true;
            break;
          }
          if (
            currUserWishList[j].product.toString() === productId &&
            singleItem.quantity < currUserWishList[j].quantity
          ) {
            currUserWishList[j].quantity = singleItem.quantity;
            ifSave = true;
            break;
          }
        }
        for (let j = 0; j < currUserCart.items.length; j++) {
          if (
            singleItem.quantity === 0 &&
            currUserCart.items[j].product.toString() === productId
          ) {
            currUserCart.items.splice(j, 1);
            ifSave = true;
            break;
          }

          if (
            currUserCart.items[j].product.toString() === productId &&
            singleItem.quantity < currUserCart.items[j].quantity
          ) {
            currUserCart.items[j].quantity = singleItem.quantity;
            ifSave = true;
            break;
          }
        }
        if (ifSave) await currUser.save();
      }
      await singleItem.save();
    }

    console.log("PRICE: " + total_price);
    const points = parseInt(req.body.points);
    // assuming passed a param -> 0---allPointsOfUser
    total_price -= points;
    user.points -= points;
    //console.log(total_price);
    const date = new Date();
    const dateToSubmit = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDay()
    );

    const newOrder = new Order({
      user_info: user._id,
      products: cartItems.map((item) => ({
        item: item.product,
        quantity: parseInt(item.quantity),
      })),
      total_price: total_price,
      order_date: dateToSubmit,
      status: "Pending", // Set the initial status as desired
    });

    user.points += Math.round(total_price * 0.1);
    /*[
      {name,quantity}
      {name,quantity}
      {name,quantity}
    ]
    */
    transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Order Successful",
      // Need to check
      html: `
        <p>Thank you for ordering!</p>
        <p>You've ordered the following: ${cartItems}</p> 
        <p>total price: ${total_price} </p>
        <p>We would love to see you again!</p>
        <p>Playtopia</p>
      `,
    });

    await newOrder.save();

    // Clear the user's cart in the session or the database
    user.cart.items = [];
    user.orderHistory.push(newOrder);

    await user.save();

    // req.session.user = user;
    // req.session.cart = { items: [] };
    await req.session.save();
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.postBuyItNow = async (req, res, next) => {
  try {
    const user = req.session.user;
    const productId = req.body.productId;
    const product = await Product.find({ _id: productId });
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
    const productToAdd = await Product.findById({ _id: req.body.productId });
    if (productToAdd == null) {
      throw new Error("Product not found");
    }
    const cart = req.session.user.cart.items || [];

    // Add the product to the cart array
    cart.push(productToAdd);

    // Update the cart in the session
    // req.session.cart = cart;
    //user.cart = cart;
    await user.save();
    await req.session.save();

    res.status(200).json("Product added to cart successfully");
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCart = async (req, res, next) => {
  const user = await User.findById(req.session.user._id);

  if (user == undefined) {
    return res.status(401).json("Log in required");
  }
  const cart = user.cart;
  if (cart.items.length === 0) return res.status(401).json("Cart is Empty");
  res.status(200).json({
    data: cart.items,
  });
};

exports.postCartAdd = async (req, res, next) => {
  try {
    // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
    // req.session.user = req.session.user[0];  --> For testing
    const productIdToSave = req.body.productId;
    let quantityToSave = parseInt(req.body.quantity);
    if (quantityToSave <= 0)
      return res.status(400).json({ message: "Non positive quantity" });
    const user = await User.findById(req.session.user._id);
    let cart;
    if (!user.cart) {
      cart = { items: [] }; // Initialize the cart if it doesn't exist
    } else {
      cart = user.cart;
    }

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
    await user.save();
    req.session.user = user;
    await req.session.save();

    res.status(200).json({ message: "Product added successfully to cart!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding product to cart!" });
  }
};

exports.postCartDelete = async (req, res, next) => {
  // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
  // req.session.user = req.session.user[0]; --> For testing

  const productId = req.body.product;
  const user = await User.findById(req.session.user._id);
  const cart = user.cart;

  try {
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItemIndex !== -1) {
      cart.items.splice(cartItemIndex, 1); // Remove the item from the cart
      //user.cart.items.splice(cartItemIndex, 1);
      // req.session.user.cart = cart;
      // req.session.cart = cart;
      // Save changes to both the user and the session
      req.session.user = user;
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
  const user = await User.findById(req.session.user._id);
  const cart = user.cart;

  try {
    const cartItem = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItem != -1) {
      cart.items[cartItem].quantity = newQuantity;
      // req.session.user.cart = cart;
      // req.session.cart = cart;
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

exports.getWishlist = async (req, res, next) => {
  const user = req.session.user;
  if (user == undefined) {
    return res.status(401).json("Log in required");
  }
  const wishlist = user.wishlist || [];
  if (wishlist.length === 0) return res.status(401).json("Wishlist is Empty");
  //console.log(cart.items);
  res.status(200).json({
    data: wishlist,
  });
};

exports.postWishlistAdd = async (req, res, next) => {
  try {
    const productIdToSave = req.body.productId;
    let quantityToSave = 1;
    const user = await User.findById(req.session.user._id);
    const wishlist = user.wishlist || [];
    if (wishlist.length > 0) {
      const existingWishlistItem = wishlist.find(
        (item) => item.product.toString() === productIdToSave
      );

      if (existingWishlistItem) {
        existingWishlistItem.quantity += quantityToSave;
      } else {
        wishlist.push({
          product: productIdToSave,
          quantity: quantityToSave,
        });
      }
    } else {
      wishlist.push({
        product: productIdToSave,
        quantity: quantityToSave,
      });
    }
    await user.save();
    req.session.user = user;
    await req.session.save();
    res
      .status(200)
      .json({ message: "Product added successfully to wishlist!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding product to wishlist!" });
  }
};

exports.postWishlistDelete = async (req, res, next) => {
  // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
  // req.session.user = req.session.user[0]; --> For testing
  console.log("POST WISHLIST DELETE");
  console.log(req.body);
  const productId = req.body.productId;
  const user = await User.findById(req.session.user._id);
  const wishlist = user.wishlist;
  try {
    const wishlistItemIndex = wishlist.findIndex(
      (item) => item.product.toString() === productId
    );
    if (wishlistItemIndex !== -1) {
      wishlist.splice(wishlistItemIndex, 1); // Remove the item from the cart
      //user.wishlist.splice(wishlistItemIndex, 1);
      // Save changes to both the user and the session
      await user.save();
      await req.session.save();
      return res
        .status(200)
        .json({ message: "Product removed from wishlist!" });
    } else {
      return res
        .status(404)
        .json({ message: "Product not found in wishlist!" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.postWishlistUpdate = async (req, res, next) => {
  // req.session.user = await User.find({ username: "admin" }); // FIND -> RETURNS ARRAY!
  // req.session.user = req.session.user[0]; --> For testing
  const productId = req.body.productId;
  const newQuantity = parseInt(req.body.quantity);
  const user = await User.findById(req.session.user._id);
  const wishlist = user.wishlist;

  try {
    const wishlistItem = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (wishlistItem != -1) {
      wishlist[wishlistItem].quantity = newQuantity;
      await user.save(); // Save changes to the database
      await req.session.save();
      return res
        .status(200)
        .json({ message: "Wishlist item quantity updated!" });
    } else {
      return res
        .status(404)
        .json({ message: "Product not found in wishlist!" });
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

exports.getAddress = async (req, res) => {
  try {
    const address = req.session.user.address;
    return res.status(200).json(address);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.postAddress = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.session.user._id);
    //console.log(user);
    user.address.city = req.body.city;
    user.address.street = req.body.street;
    user.address.streetNumber = req.body.streetNumber;
    user.address.country = req.body.country;
    user.address.postalCode = req.body.postalCode;
    user.address.firstName = req.body.firstName;
    user.address.lastName = req.body.lastName;
    user.address.phoneNumber = req.body.phoneNumber;
    req.session.user = user;
    await req.session.save();
    await user.save();
    res.status(200).json({
      message: "Address updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCreditCard = async (req, res) => {
  try {
    const creditCard = req.session.user.creditCard;
    return res.status(200).json(creditCard);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.creditCardUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.session.user._id);
    user.creditCard.card_number = req.body.card_number;
    user.creditCard.holder_name = req.body.holder_name; // NEED TO FIX AND ADJUST WITH FRONTEND
    user.creditCard.expiration_date = req.body.expiration_date; // NEED TO ADJUST BY FRONT
    user.creditCard.ccv = req.body.ccv;
    await user.save();
    req.session.user = user;
    await req.session.save();
    res.status(200).json({
      message: "Credit card updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.postSupplier = async (req, res) => {
  const {
    price,
    age_range,
    category,
    title,
    condition,
    quantity,
    description,
  } = req.body;
  try {
    const checkIfProductExist = await Product.find({ title: title });
    console.log(checkIfProductExist);
    if (checkIfProductExist.length != 0) {
      return res.status(401).json({ message: "Product name already in use." });
    }
    // const conn = await mongoose.createConnection(
    //   "mongodb+srv://" +
    //     process.env.DB_USERNAME +
    //     ":" +
    //     process.env.DB_PASSWORD +
    //     "@webstore.svlylpv.mongodb.net/"
    // );

    // let Image = gridfs(conn.db, mongoose.mongo);
    const images = req.files["image[]"];
    console.log(images);
    const product = new Product({
      category: category,
      condition: condition,
      price: price,
      title: title,
      age_range: age_range,
      image: images.map((image) => image.path.split("public")[1]),
      description: description,
      quantity: quantity,
      added_date: new Date(),
      // added_date: new Date(),
    });

    // const imageDocs = [];
    // for (const file of req.files) {
    //   const image = new Image({
    //     filename: file.filename,
    //     contentType: file.mimetype,
    //   });

    //   const imageDoc = await image.write(file.path);
    //   imageDocs.push(imageDoc);
    // }

    //product.image = imageDocs.map((imageDoc) => imageDoc._id);

    await product.save();
    return res.status(200).json({ message: "Product added successfully !" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in server" });
  }
};

exports.getPersonalDetails = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in server" });
  }
};

exports.postPersonalDetails = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.name.firstName = req.body.firstName;
    user.name.lastName = req.body.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.email = req.body.email;
    await user.save();
    req.session.user = user;
    await req.session.save();

    return res.status(200).json({ message: "Changed details successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in server" });
  }
};
