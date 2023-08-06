const path = require("path");
const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getHomePage);

router.get("/about", shopController.getAboutPage);

// router.get("/contact", shopController.getContactPage);

// router.get("/product/:productId", shopController.getProduct);

// router.post("/product/:productId/add-to-cart", shopController.addProductToCart);

// router.get("/payment/cart", shopController.cartCheckout);

// router.get("/payment/:productId", shopController.singleProductCheckout);

// router.post("/payment/submit", shopController.processPayment);

// router.get("/cart", isAuth, shopController.getCart);

// router.post("/cart", isAuth, shopController.postCart);

// router.get("/category/:category", shopController.getCategory);

// router.get("/faq", shopController.getFaq);

// router.get("/supplier", shopController.getSuppplierPage);

// router.post("/supplier/submit", shopController.submitSuplliersItem);

// router.get("/uploadYad2", shopController.getYad2);

// router.get("/uploadYad2/submit", shopController.submitYad2);

module.exports = router;
