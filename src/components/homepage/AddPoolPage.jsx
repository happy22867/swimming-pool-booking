import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AddPoolPage() {
  const [formData, setFormData] = useState({
    location: "",
    entryFee: "",
    timing: "",
    slots: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/pools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: formData.location,
          entryFee: Number(formData.entryFee),
          timing: formData.timing,
          slots: Number(formData.slots),
          imageUrl: formData.imageUrl,
          description: formData.description,
        }),
      });

      if (response.ok) {
        setMessage("Pool added successfully!");
        setFormData({
          location: "",
          entryFee: "",
          timing: "",
          slots: "",
          imageUrl: "",
          description: "",
        });
      } else {
        const data = await response.json();
        setMessage("Error: " + (data.message || "Failed to add pool"));
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Add New Pool</h1>
        {message && <p className="mb-4 text-center text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleChange}
            placeholder="Entry Fee (₹)"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            placeholder="Timing (e.g., 9 AM - 6 PM)"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="slots"
            value={formData.slots}
            onChange={handleChange}
            placeholder="Available Slots"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Pool"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
