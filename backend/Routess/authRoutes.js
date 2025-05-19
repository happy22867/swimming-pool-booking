  const express = require("express");
  const router = express.Router();
  const User = require("../models/User");
  const authController=require('../controllers/authController')
  const { signup } = require("../controllers/authController");
  const jwt = require("jsonwebtoken");
  require('dotenv').config();


  const JWT_SECRET = process.env.JWT_SECRET;


  // Signup 
  router.post("/signup", async (req, res) => {
    console.log("dhffd");
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User({ username, email, password });
      await user.save();

      // Create token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

      res.status(201).json({ token, user: { id: user._id, username, email } });
    }catch (error) {
    console.error("Signup error:", error.message || error);
    res.status(500).json({ message: error.message || "Server error" });
  }

  })



  router.post("/send-otp", authController.sendOTP);
  router.post("/verify-otp", authController.verifyOTP);



  // Login
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // Create token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

      res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post("/signup", signup);

  module.exports = router;
