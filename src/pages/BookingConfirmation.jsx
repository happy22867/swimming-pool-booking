
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingConfirmation({ booking }) {
  const navigate = useNavigate();

  // Dummy booking data fallback if not passed as prop
  booking = booking || {
    poolName: "Blue Lagoon Pool",
    address: "123 Aqua Street, Splash City",
    date: "2025-05-25",
    time: "4:00 PM - 5:00 PM",
    bookingId: "SG123456",
    amount: 299,
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-900 to-cyan-700 flex flex-col justify-center items-center p-8 text-white font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        <svg
          className="mx-auto mb-6 w-20 h-20 text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Booking Confirmed!</h1>
        <p className="text-lg mb-6">Thank you for booking your swim with SwimmingGo.</p>
        
        <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 text-left">
          <p className="mb-2"><span className="font-semibold">Pool:</span> {booking.poolName}</p>
          <p className="mb-2"><span className="font-semibold">Address:</span> {booking.address}</p>
          <p className="mb-2"><span className="font-semibold">Date & Time:</span> {booking.date} | {booking.time}</p>
          <p className="mb-2"><span className="font-semibold">Booking ID:</span> {booking.bookingId}</p>
          <p className="mb-2"><span className="font-semibold">Amount Paid:</span> ₹{booking.amount}</p>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
