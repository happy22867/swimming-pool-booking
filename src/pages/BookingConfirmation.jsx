import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";  // 1. import useParams

export default function BookingConfirmation() {
  const { bookingId } = useParams();   // 2. get bookingId from URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);  // 3. state for booking data
  const [loading, setLoading] = useState(true);  // loading state

  useEffect(() => {
  const token = localStorage.getItem("token"); // or useContext(AuthContext)

  fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch booking data");
      return res.json();
    })
    .then((data) => {
      setBooking(data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}, [bookingId]);


  if (loading) return <div>Loading booking details...</div>;  // loading fallback
  if (!booking) return <div>Booking not found.</div>;          // error fallback

  // 5. render booking info once data is fetched
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-900 to-cyan-700 flex flex-col justify-center items-center p-8 text-white font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        {/* Confirmation icon */}
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

        <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 text-left text-black">
          <p className="mb-2"><span className="font-semibold">Pool:</span> {booking.poolName}</p>
          <p className="mb-2"><span className="font-semibold">Address:</span> {booking.address}</p>
          <p className="mb-2"><span className="font-semibold">Date & Time:</span> {booking.date} | {booking.time}</p>
          <p className="mb-2"><span className="font-semibold">Booking ID:</span> {booking._id}</p>
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
