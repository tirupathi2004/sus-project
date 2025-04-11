const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Send OTP to email
router.post('/login/send-otp', authController.sendOtp);

// Verify OTP and return JWT token
router.post('/login/verify', authController.verifyOtp);

// Forgot password – send reset email
router.post('/forgot-password', authController.forgotPassword);

// Confirm payment and upgrade to premium
router.post('/payment/confirm', authController.confirmPayment);

module.exports = router;
