const express = require("express");
const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// CRUD

router.post("/create/product", isAdmin, adminController.create);
router.get("/get/product/:id", isAdmin, adminController.get);
router.post("/update/product/:id", isAdmin, adminController.update);
router.post("/delete/product/:id", isAdmin, adminController.delete);

router.post("/create/order", isAdmin, adminController.create);
router.get("/get/order/:id", isAdmin, adminController.get);
router.post("/update/order/:id", isAdmin, adminController.update);
router.post("/delete/order/:id", isAdmin, adminController.delete);

router.post("/create/store-locations", isAdmin, adminController.create);
router.get("/get/store-locations/:id", isAdmin, adminController.get);
router.post("/update/store-locations/:id", isAdmin, adminController.update);
router.post("/delete/store-locations/:id", isAdmin, adminController.delete);

router.post("/create/user", adminController.create);
router.get("/get/user/:id", isAdmin, adminController.get);
router.put("/update/user/:id", isAdmin, adminController.update);
router.post("/delete/user/:id", isAdmin, adminController.delete);

router.post("/points/user/:id", isAdmin, adminController.updatePointsUser); //TODO

module.exports = router;
