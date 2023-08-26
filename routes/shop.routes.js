const path = require("path");
const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const multer = require("multer");

// Configure multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/product-images"); // Change this to your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

//const upload = multer({ dest: "../public/product-images" });
const multerConfig = upload.fields([{ name: "image[]", maxCount: 4 }]);

router.get("/", shopController.getHomePage);

router.get("/about", shopController.getAboutPage);

router.get("/addressUpdate", shopController.getaddressUpdate);

router.get("/contact", shopController.getContactPage);

router.get("/creditCardUpdate", shopController.getCreditCardUpdate);

router.get("/product-details", shopController.getProductDetails);
router.get("/product-update", shopController.getProductUpdate);

router.get("/gift-finder", shopController.getGiftFinder);

router.get("/manager", isAdmin, shopController.getManager);

router.get("/products", shopController.getProducts);

router.get("/q&a", shopController.getQA);

router.get("/statistics", shopController.getStatistics);

router.get("/supplier", shopController.getSupplier);
router.post("/supplier", multerConfig, shopController.postSupplier);

router.get("/uploadYad2", isAuth, shopController.getUploadYad2);
router.post("/uploadYad2", isAuth, multerConfig, shopController.uploadYad2);

router.get("/Yad2Update", isAuth, shopController.getYad2Update);
router.post("/Yad2Update/:id", isAuth,multerConfig, shopController.postYad2Update);

router.get("/my-account", isAuth, shopController.getYourAccount);

router.get("/cart", isAuth, shopController.getCartPage);
router.get("/cart/products", isAuth, shopController.getCart);
router.post("/cart/add", isAuth, shopController.postCartAdd);
router.post("/cart/delete", isAuth, shopController.postCartDelete);
router.post("/cart/update", isAuth, shopController.updateCartProductQuantity);

router.get("/wishlist", isAuth, shopController.getWishlistPage);
router.get("/wishlist/products", isAuth, shopController.getWishlist);
router.post("/wishlist/add", isAuth, shopController.postWishlistAdd);
router.post("/wishlist/delete", isAuth, shopController.postWishlistDelete);
router.post("/wishlist/update", isAuth, shopController.postWishlistUpdate);

router.get("/payment", isAuth, shopController.getPayment);
router.post("/payment", isAuth, shopController.postPayment);
router.post("/buy-it-now/:productId", isAuth, shopController.postBuyItNow);

router.get("/address", isAuth, shopController.getAddress);
router.post("/address", isAuth, shopController.postAddress);
router.get("/creditcard", isAuth, shopController.getCreditCard);
router.post("/creditcard", isAuth, shopController.creditCardUpdate);
router.get("/personal-details", isAuth, shopController.getPersonalDetails);
router.post("/personal-details", isAuth, shopController.postPersonalDetails);

module.exports = router;
