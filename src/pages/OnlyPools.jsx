import { useEffect, useState } from "react";
import Footer from "../components/homepage/Footer";
import Navbar from "../components/homepage/Navbar";

export default function PoolsPage() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/pools") // your backend API endpoint
      .then((res) => res.json())
      .then((data) => {
        setPools(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch pools:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading pools...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 py-12 px-4 md:px-10">
        <h1 className="text-4xl md:text-5xl font-serif italic font-bold text-center text-indigo-700 mb-12">
          🌊 Dive Into the Best Pools Near You!
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
          {pools.map((pool) => (
            <div
              key={pool._id}  // note _id from MongoDB
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 flex flex-col"
            >
              <img
                src={pool.imageUrl || "https://picsum.photos/400/250"} // fallback image
                alt={`Pool ${pool._id}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-indigo-600 mb-3 italic">
                  🏊 Pool #{pool._id}
                </h2>
                <p className="text-gray-700 italic mb-1">
                  📍 <span className="font-semibold not-italic">Location:</span>{" "}
                  {pool.location}
                </p>
                <p className="text-gray-700 italic mb-1">
                  💵 <span className="font-semibold not-italic">Entry Fee:</span> ₹
                  {pool.entryFee}
                </p>
                <p className="text-gray-700 italic mb-1">
                  ⏰ <span className="font-semibold not-italic">Timing:</span>{" "}
                  {pool.timing}
                </p>
                <p className="text-gray-700 italic mb-4">
                  🎟️ <span className="font-semibold not-italic">Available Slots:</span>{" "}
                  {pool.slots}
                </p>
                <p className="text-gray-600 italic mb-6 leading-relaxed text-justify">
                  {pool.description}
                </p>
                <button className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
