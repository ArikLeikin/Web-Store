const express = require("express");
const adminController = require("../controllers/admin");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();
const multer = require("multer");
// const mongoose = require("mongoose");
// const gridfs = require("mongoose-gridfs");
// gridfs.mongo = mongoose.mongo;
// const conn = await mongoose.createConnection(
//   "mongodb+srv://" +
//     process.env.DB_USERNAME +
//     ":" +
//     process.env.DB_PASSWORD +
//     "@webstore.svlylpv.mongodb.net/"
// );

// const Image = gridfs(conn.db, mongoose.mongo);

// CRUD
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

router.post(
  "/create/product",
  isAdmin,
  upload.array("image", 4),
  adminController.create
);
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
