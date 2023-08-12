const express = require("express");

const router = express.Router();

router.post("/register/submit", connectController.register);
router.post("/login/submit", connectController.login);

//Need to check
router.post("/products/add-to-cart/:productName", paymentController.submit);
router.post("/payment/submit", paymentController.submit);

router.post("/supplier/submit", supplierController.submit);

router.post("/uploadYad2/submit", yad2Controller.submit);

module.exports = router;
