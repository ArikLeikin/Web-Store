const express = require("express");
const authController = require("../controllers/auth");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

router.get("/login", isLoggedIn, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.postLogout);

router.post("/passwordUpdate", authController.postUpdatePassword);

router.get("/passwordReset", authController.getResetPassword);
router.post("/passwordReset", authController.postResetPassword);

router.get("/new-password", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
