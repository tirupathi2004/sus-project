const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../services/emailService');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);
  let user = await User.findOne({ email });
  if (!user) user = new User({ email });
  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();
  await sendEmail(email, "Your CodeCon OTP", `<p>Your OTP is <b>${otp}</b></p>`);
  res.json({ message: 'OTP sent successfully' });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpiry < Date.now())
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  const link = `https://yourdomain.com/reset-password/${token}`;
  await sendEmail(email, "Reset your CodeCon password", `<p>Click <a href="${link}">here</a> to reset your password</p>`);
  res.json({ message: 'Reset link sent' });
};

exports.confirmPayment = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { isPremium: true });
  await sendEmail(email, "Payment Successful", "<p>Your CodeCon premium is now active.</p>");
  res.json({ message: 'Payment confirmed and user upgraded' });
};