import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment({ booking }) {
  const navigate = useNavigate();

  // Dummy booking data fallback
  booking = booking || {
    poolName: "Blue Lagoon Pool",
    date: "2025-05-25",
    time: "4:00 PM - 5:00 PM",
    amount: 299,
  };

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !cardNumber.match(/^\d{16}$/) ||
      !name ||
      !expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) ||
      !cvv.match(/^\d{3}$/)
    ) {
      setError("Please enter valid payment details.");
      return;
    }

    setError("");
    // Here you would call your payment API

    // On success, navigate to confirmation page
    navigate("/booking-confirmation", { state: { booking } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 p-8 flex justify-center items-center font-sans text-white">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-10 max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Payment</h1>
        <p className="mb-6 text-center text-lg">
          Pay ₹{booking.amount} for booking <br />
          <span className="font-semibold">{booking.poolName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-black">Card Number</label>
            <input
              type="text"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black">Cardholder Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="John Doe"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-black">Expiry (MM/YY)</label>
              <input
                type="text"
                maxLength="5"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-black">CVV</label>
              <input
                type="password"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="123"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 rounded-lg py-3 font-semibold transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
