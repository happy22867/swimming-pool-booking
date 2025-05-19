const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings,
  getBookingById,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getBookings);
router.get("/:id", protect, getBookingById); // ✅ add this

module.exports = router;
