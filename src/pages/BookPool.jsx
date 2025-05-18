import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";

export default function BookPool() {
  const { poolId } = useParams();
  const [pool, setPool] = useState(null);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPool = async () => {
      const res = await fetch(`http://localhost:5000/api/pools/${poolId}`);
      const data = await res.json();
      setPool(data);
    };
    fetchPool();
  }, [poolId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ poolId, date, guests }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Booking successful!");
    } else {
      setMessage(data.message || "Booking failed");
    }
  };

  if (!pool) return <div className="text-center p-10">Loading pool...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{pool.name}</h1>
        <img
          src={pool.imageUrl}
          alt={pool.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <p className="text-gray-700 mb-6">{pool.description}</p>

        <form onSubmit={handleBooking} className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Select Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Guests</label>
            <input
              type="number"
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
              max="10"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Confirm Booking
          </button>
        </form>

        {message && <p className="mt-4 text-lg text-center text-green-600">{message}</p>}
      </div>
      <Footer />
    </div>
  );
}
