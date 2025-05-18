export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-xl font-bold text-indigo-700">Menu</h2>
        <button onClick={() => setIsOpen(false)} className="text-2xl">
          ×
        </button>
      </div>
      <ul className="flex flex-col space-y-4 p-4 text-lg font-medium text-indigo-700">
        <li>
          <a href="/">🏠 Home</a>
        </li>
        <li>
          <a href="/pools">🏊 Pools</a>
        </li>
        <li>
          <a href="/about">ℹ️ About</a>
        </li>
        <li>
          <a href="/contact">📞 Contact</a>
        </li>
        <li>
          <a href="/login">🔐 Login</a>
        </li>
        <li>
          <a href="/signup">📝 Signup</a>
        </li>
      </ul>
    </div>
  );
}
