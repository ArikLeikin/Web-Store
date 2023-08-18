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

router.get("/addressUpdate", shopController.getaddressUpdate);

router.get("/contact", shopController.getContactPage);

router.get("/creditCardUpdate", shopController.getCreditCardUpdate);

router.get("/product-details", shopController.getProductDetails);

router.get("/giftFinder", shopController.getGiftFinder);

router.get("/login", shopController.getLogin);

router.get("/manager", shopController.getManager);

router.get("/payment", shopController.getPayment);

router.get("/products", shopController.getProducts);

router.get("/q&a", shopController.getQA);

router.get("/statistics", shopController.getStatistics);

router.get("/supplier", shopController.getSupplier);

router.get("/uploadYad2", shopController.getUploadYad2);

router.get("/Yad2Update", shopController.getYad2Update);

router.get("/YourAccount", shopController.getYourAccount);

module.exports = router;
