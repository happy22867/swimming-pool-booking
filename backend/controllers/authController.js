const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");  

// Simple in-memory OTP store (use DB for real apps)
const otpStore = {};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Only Gmail addresses are allowed" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

// Send OTP to email
const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP with expiration (5 mins)
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  try {
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
    });
    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ message: "OTP not found or expired" });
  }

  if (otpStore[email].expires < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otpStore[email].otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP valid
  delete otpStore[email];
  res.json({ message: "OTP verified successfully" });
};

module.exports = {
  signup,
  sendOTP,
  verifyOTP,
};
