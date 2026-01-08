const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtpAndReset,
} = require("../controllers/authController");



router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndReset);

module.exports = router;
