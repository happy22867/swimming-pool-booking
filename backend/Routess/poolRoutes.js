
const verifyAdmin = require("../middleware/verifyAdmin");
const express = require("express");
const router = express.Router();
const Pool = require("../models/Pool");
require('dotenv').config();
  
// import admin middleware-

// GET - Public: List all pools
router.get("/", async (req, res) => {
  try {
    const pools = await Pool.find();
    res.json(pools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Admin only: Add a new pool
router.post("/", verifyAdmin, async (req, res) => {

  try {
    const newPool = new Pool(req.body);
    const saved = await newPool.save();
    
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Admin only: Delete a pool by ID
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Pool.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Pool not found" });
    }
    res.json({ message: "Pool deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// In routes/pools.js
router.get("/:id", async (req, res) => {
  try {
    const pool = await Pool.findById(req.params.id);
    if (!pool) return res.status(404).json({ message: "Pool not found" });
    res.json(pool);
  } catch (err) {
    console.error("Fetch pool error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
