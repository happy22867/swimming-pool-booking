import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

export default function PoolsSection() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/pools")
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

  const handleBookNow = (poolId) => {
    if (!isLoggedIn()) {
      navigate("/login");
    } else {
      navigate(`/book/${poolId}`);
    }
  };

  if (loading) return <div>Loading pools...</div>;

  return (
    <section id="pools" className="px-6 py-20 bg-white bg-opacity-90">
      <h3 className="text-3xl font-extrabold text-center text-indigo-800 mb-14">
        Top Pools in Dehradun
      </h3>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {pools.map((pool) => (
          <div
            key={pool._id}
            className="rounded-xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={pool.imageUrl || "https://picsum.photos/400/300"}
              alt={pool.name}
              className="w-full h-70 object-cover"
            />
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <h4 className="text-2xl font-extrabold text-indigo-700 italic mb-2">{pool.name}</h4>

              <div className="text-gray-600 space-y-2 text-base">
                <p className="italic">
                  <span className="font-semibold">Location:</span> {pool.location}
                </p>
                <p className="italic">
                  <span className="font-semibold">Entry Fee:</span> ₹{pool.entryFee}
                </p>
                <p className="italic">
                  <span className="font-semibold">Timing:</span> {pool.timing}
                </p>
                <p className="italic">
                  <span className="font-semibold">Available Slots:</span> {pool.slots}
                </p>
              </div>

              <button
                onClick={() => handleBookNow(pool._id)}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
