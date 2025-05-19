import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, user } = useContext(AuthContext); // get login and user from context
  const navigate = useNavigate();

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // On successful login, save user and token globally
      login(data.user, data.token);

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-6 sm:mb-8 text-center">
            Login to SwimmingGo
          </h2>
          <form
            className="space-y-5 sm:space-y-6 text-base sm:text-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 sm:px-5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 sm:px-5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Signup prompt below form */}
          <p className="mt-6 text-center text-gray-700 italic text-lg">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline focus:outline-none"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
