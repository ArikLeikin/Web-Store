const express = require("express");
const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();
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
const multerConfig = upload.fields([{ name: "image[]", maxCount: 4 }]);

// CRUD
router.post("/create/product", isAdmin, multerConfig, adminController.create);
router.get("/get/product/:id", isAdmin, adminController.get);
router.post("/update/product/:id", isAdmin, adminController.update);
router.post("/delete/product/:id", isAdmin, adminController.delete);
router.get("/edit/product/:id", isAdmin, adminController.getProductUpdate);

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

router.post("/points/user/:id", isAdmin, adminController.updatePointsUser);

module.exports = router;
