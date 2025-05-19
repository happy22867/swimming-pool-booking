import { useState, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/authContext"; // adjust if needed

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="text-blue-400 px-4 py-3 relative sm:flex sm:justify-between items-center backdrop-blur-sm">

        {/* 🟢 Mobile: Hamburger menu */}
        <button
          className="sm:hidden text-3xl z-20"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu />
        </button>

        {/* 🟢 Mobile: Centered Logo */}
        <div className="sm:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-sky-500 to-indigo-600 bg-clip-text text-transparent font-[Orbitron] drop-shadow-sm">
          Swimmingo
        </div>

        {/* 🟢 Desktop: Full Navbar */}
        <div className="hidden sm:flex justify-between items-center w-full">
          {/* Logo */}
          <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-sky-500 to-indigo-600 bg-clip-text text-transparent font-[Orbitron] drop-shadow-sm">
            Swimmingo
          </div>

          {/* Nav Links */}
          <ul className="flex space-x-10 text-lg font-semibold">
            <li><a href="/">Home</a></li>
            <li><a href="/pools">Pools</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

          {/* Auth Section */}
          <div className="space-x-4 flex items-center">
            {user ? (
              <>
                <span className="text-white font-semibold text-lg italic">
                   {user.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded hover:bg-indigo-100 transition text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-indigo-700 transition font-semibold text-lg">Login</a>
                <a href="/signup" className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded hover:bg-indigo-100 transition text-lg">Signup</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 🟣 Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </>
  );
}
