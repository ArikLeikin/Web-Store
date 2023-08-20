const express = require("express");
const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// CRUD

router.post("/crud/product", isAdmin, adminController.create);
router.get("/crud/product/:id", isAdmin, adminController.get);
// router.put("/crud/product/:id", isAdmin, adminController.edit);
// router.delete("/crud/product/:id", isAdmin.adminController.delete);

router.post("/crud/order", isAdmin, adminController.create);
router.get("/crud/order/:id", isAdmin, adminController.get);
// router.put("/crud/order/:id", isAdmin);
// router.delete("/crud/order/:id", isAdmin);

router.post("/crud/store-locations", isAdmin, adminController.create);
// router.get("/crud/store-locations/:id", isAdmin, adminController.get);
// router.put("/crud/store-locations/:id", isAdmin);
// router.delete("/crud/store-locations/:id", isAdmin);

router.post("/crud/user", isAdmin, adminController.create);
// router.get("/crud/user/:id", isAdmin, adminController.get);
// router.put("/crud/user/:id", isAdmin);
// router.delete("/crud/user/:id", isAdmin);

module.exports = router;
