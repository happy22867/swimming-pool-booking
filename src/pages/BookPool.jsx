import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";

export default function BookPool() {
  const { poolId } = useParams();
  const navigate = useNavigate();

  const [pool, setPool] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

      // 1. Redirect if email not verified
  if (localStorage.getItem("emailVerified") !== "true") {
    navigate("/verify-email", { state: { poolId } });
    return;  // Prevent fetching pool if redirecting
  }




    const fetchPool = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pools/${poolId}`);
        const data = await res.json();
        setPool(data);
      } catch (err) {
        console.error("Failed to load pool:", err);
        setMessage("Failed to load pool details.");
      }
    };
    fetchPool();
  }, [poolId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ poolId, date, time, guests }),
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (res.ok) {
        console.log("Booking ID:", data?.booking?._id);
      

        // ✅ Navigate to payment with all booking data
        navigate(`/payment/${data?.booking._id}`, {
          state: {
            booking: {
              poolId,
              date,
              time,
              guests,
              poolName: pool.name,
              amount: data.booking.amount, // or however you calculate price
            }
          }
        });

      } else {
        setMessage(data.message || "❌ Booking failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Booking failed due to network error");
    } finally {
      setLoading(false);
    }
  };

  if (!pool) return (
    <div className="text-center p-10 text-xl text-indigo-700 italic">
      Loading pool...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-center text-indigo-800 italic mb-6">
          Book Your Slot at {pool.name}
        </h1>

        <img
          src={pool.imageUrl || "/image2.jpg"}
          alt={pool.name}
          className="w-full h-100 object-cover rounded-2xl shadow-md mb-8"
        />

        <div className="text-lg italic text-gray-800 mb-10 text-center px-2 space-y-2">
          <p>"Splash into serenity — your perfect escape from the daily grind."</p>
          <p>"Crystal-clear waters under an open sky, waiting just for you."</p>
          <p>"Unwind, recharge, and float into blissful relaxation."</p>
          <p>"Ideal for solo refreshment or joyful moments with friends and family."</p>
          <p>"Where comfort meets luxury — book your swim today!"</p>
        </div>

        <form onSubmit={handleBooking} className="space-y-6 px-4 md:px-0">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1 italic">📅 Select Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1 italic">⏰ Select Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1 italic">👥 Number of Guests</label>
            <input
              type="number"
              required
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {loading ? "Booking..." : "✅ Confirm Booking"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-xl text-center font-semibold ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
