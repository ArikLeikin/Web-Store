const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

router.get("/new-password", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
