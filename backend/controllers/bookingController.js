

const { get } = require('mongoose');
const Booking=require('../models/Booking.js');
const createBooking = async (req, res) => {
  try {
    const { poolId, date, time, guests } = req.body;
    const userId = req.user.id;

    // Example booking creation
    const booking = new Booking({ pool: poolId,  email: user.email, user: userId, date, time, guests });
    await booking.save();

    return res.status(201).json({
      message: "Booking successful",
      booking,  // send booking object here
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create booking" });
  }
};



// ✅ New controller to get booking by ID and populate pool details

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("pool");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      _id: booking._id,
      date: booking.date,
      time: booking.time,
      amount: booking.pool.price,
      poolName: booking.pool.name,
      address: booking.pool.address,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




// New GET controller to get bookings for the logged-in user
const getBookings = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    // Find all bookings for this user, optionally populate pool details if needed
    const bookings = await Booking.find({ user: userId }).populate('pool');

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = { createBooking,getBookings,getBookingById };
