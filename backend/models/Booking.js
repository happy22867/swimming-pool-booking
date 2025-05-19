const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  pool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pool",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: String,
  time: String,
  guests: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
