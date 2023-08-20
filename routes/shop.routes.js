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

router.get("/gift-finder", shopController.getGiftFinder);

router.get("/login", shopController.getLogin);

router.get("/manager", shopController.getManager);

router.get("/payment", shopController.getPayment);

router.get("/products", shopController.getProducts);

router.get("/q&a", shopController.getQA);

router.get("/statistics", shopController.getStatistics);

router.get("/supplier", shopController.getSupplier);
router.post(
  "/supplier",
  upload.array("productPhoto", 4),
  shopController.postSupplier
);

router.get("/uploadYad2", isAuth, shopController.getUploadYad2);
router.post("/uploadYad2", isAuth, shopController.uploadYad2);

router.get("/Yad2Update", shopController.getYad2Update);

router.get("/my-account", shopController.getYourAccount);

router.post("/submit-payment", isAuth, shopController.postPayment);

router.get("/cart", isAuth, shopController.getCart);
router.post("/cart/add", shopController.postCartAdd);
router.post("/cart/delete", shopController.postCartDelete);
router.post("/cart/update", shopController.updateCartProductQuantity);

router.get("/payment", shopController.getPayment);
router.post("/payment", isAuth, shopController.postPayment);
router.post("/buy-it-now/:productId", isAuth, shopController.postBuyItNow);

router.post("/address-update", isAuth, shopController.postAddress);
router.post("/credit-card-update", isAuth, shopController.creditCardUpdate);

module.exports = router;
