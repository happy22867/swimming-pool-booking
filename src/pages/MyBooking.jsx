import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { isLoggedIn } from "../utils/auth";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login"); // Redirect if NOT logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // make sure this matches your login token storage
        const response = await axios.get("http://localhost:5000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-800 via-blue-900 to-indigo-900 p-8 font-sans text-white">
      <div className="flex items-center mb-8">
        <ArrowLeft
          className="cursor-pointer mr-4"
          size={28}
          onClick={() => navigate("/")}
        />
        <h1 className="text-4xl font-bold tracking-wider">My Bookings</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{booking.pool?.name || "Pool"}</h2>
                <p>{booking.date} | {booking.time}</p>
                <p className="italic">Guests: {booking.guests}</p>
              </div>
              <div>
                <span className="px-4 py-1 rounded-full font-semibold bg-green-500 text-white">
                  Upcoming
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
