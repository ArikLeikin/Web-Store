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

exports.postPayment = (req, res, next) => {
  const file = path.join(__dirname, "../public/html/my-account.html");
  res.sendFile(file, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
