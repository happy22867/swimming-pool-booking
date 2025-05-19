// /controllers/otpController.js
const nodemailer = require("nodemailer");
const OTP = require("../models/OtpModel"); // We’ll create this
const User = require("../models/User"); // Your existing user model

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// Generate random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  try {
    await OTP.findOneAndDelete({ email }); // Clear old

    const otpDoc = await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc || otpDoc.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await OTP.deleteOne({ email });
    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
