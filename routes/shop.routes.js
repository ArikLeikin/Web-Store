const path = require("path");
const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");

// Configure multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/product-images"); // Change this to your desired upload directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
router.get("/", shopController.getHomePage);

router.get("/about", shopController.getAboutPage);

router.get("/contact", shopController.getContactPage);

router.get("/product/:productId", shopController.getProduct);

router.get("/product", shopController.getAllProducts);

router.post("/product/:productId/", shopController.addProductToCart);

// router.get("/payment/cart", shopController.cartCheckout);

// router.get("/payment/:productId", shopController.singleProductCheckout);

// router.post("/payment/submit", shopController.processPayment);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.get("/category/:category", shopController.getCategory);

router.get("/faq", shopController.getFaq);

router.get("/supplier", shopController.getSuppplierPage);

router.post(
  "/supplier",
  upload.single("image"),
  shopController.submitSuplliersItem
);

router.get("/uploadYad2", shopController.getYad2);

router.post("/uploadYad2", shopController.submitYad2);

module.exports = router;
