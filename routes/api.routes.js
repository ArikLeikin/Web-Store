const express = require("express");
const apiController = require("../controllers/api");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/api/user/:userId", apiController.getUser);
router.get("/api/users", apiController.getAllUsers);

router.get("/api/products/:amountValue", apiController.getProductsByAmount);
router.get("/api/products", apiController.getAllProducts);
router.get("/api/product/:productId", apiController.getProduct);

router.get("/api/category/:categoryName", apiController.getProdcutsByCategory);

router.get("/api/wishlist", isAuth, apiController.getWishList);
router.get("/api/orders/history", isAuth, apiController.getOrderHistory);

router.get("/api/order/:orderId", apiController.getOrder);
router.get("/api/orders/user/:userId", apiController.getAllOrdersByUser);
router.get("/api/orders", apiController.getAllOrders);

router.get("/api/supplier/:supplierId", apiController.getSupplier);
router.get("/api/suppliers", apiController.getAllSuppliers);

router.get("/api/store-locations", apiController.getSotreLocations);

module.exports = router;
