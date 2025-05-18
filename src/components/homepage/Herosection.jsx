import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="text-center py-32 px-4 text-white">
      <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
        Make Waves, Not Plans — Dive Into Your Perfect Pool Today!
      </h2>
      <p className="text-lg text-indigo-100 mb-10 max-w-xl mx-auto">
        Experience seamless booking and instant access to the best pools around you — no hassle, just splash.
      </p>
      <Link
        to="/pools"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full transition shadow-lg"
      >
        Explore Pools
      </Link>
    </section>
  );
}
