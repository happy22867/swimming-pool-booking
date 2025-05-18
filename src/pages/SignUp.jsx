import  { useState, useContext } from "react";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log("Signup response data:", data);

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      login(data.user, data.token);
      console.log("Navigating to dashboard...");

      navigate("/login");
      console.log("Navigating to dashboard...");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4 py-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-12">
          <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">Create Your Account</h2>
          <form className="space-y-6 text-lg" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
