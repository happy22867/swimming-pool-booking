import React from "react";

export default function Invoice({ booking }) {
  booking = booking || {
    poolName: "Blue Lagoon Pool",
    date: "2025-05-25",
    time: "4:00 PM - 5:00 PM",
    bookingId: "SG123456",
    amount: 299,
    tax: 18,
  };

  const totalAmount = booking.amount + (booking.amount * booking.tax) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-10 text-white font-mono flex justify-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-6 border-b border-white/30 pb-2">Invoice</h1>
        <p><strong>Pool:</strong> {booking.poolName}</p>
        <p><strong>Date & Time:</strong> {booking.date} | {booking.time}</p>
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <hr className="my-4 border-white/20" />
        <p><strong>Amount:</strong> ₹{booking.amount}</p>
        <p><strong>Tax ({booking.tax}%):</strong> ₹{((booking.amount * booking.tax) / 100).toFixed(2)}</p>
        <hr className="my-4 border-white/20" />
        <p className="text-xl font-semibold">Total: ₹{totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}
