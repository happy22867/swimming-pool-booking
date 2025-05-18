import React from "react";

const dummyBookings = [
  {
    id: "SG123456",
    poolName: "Blue Lagoon Pool",
    date: "2025-05-25",
    time: "4:00 PM - 5:00 PM",
    status: "Upcoming",
  },
  {
    id: "SG654321",
    poolName: "Crystal Waters Pool",
    date: "2025-04-10",
    time: "10:00 AM - 11:00 AM",
    status: "Completed",
  },
];

export default function MyBookings() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-800 via-blue-900 to-indigo-900 p-8 font-sans text-white">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wider">My Bookings</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {dummyBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{booking.poolName}</h2>
              <p>{booking.date} | {booking.time}</p>
              <p className="italic">Booking ID: {booking.id}</p>
            </div>
            <div>
              <span
                className={`px-4 py-1 rounded-full font-semibold ${
                  booking.status === "Upcoming"
                    ? "bg-green-500 text-white"
                    : booking.status === "Completed"
                    ? "bg-gray-400 text-gray-900"
                    : "bg-red-600 text-white"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
