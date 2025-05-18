import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
        Go to Home
      </Link>
    </div>
  );
}
