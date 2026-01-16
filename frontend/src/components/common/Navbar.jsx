import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#0A1F44] text-white px-4 py-3 flex justify-between items-center shadow-md">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/favicon.svg" alt="Watchify" className="w-8 h-8" />
          Watchify
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>

          {isAdmin && (
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right: Profile + Mobile Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={user.avatar || "/assets/images/placeholder.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2"
              />
              <span className="text-sm hidden sm:block">
                {user.name}
              </span>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="hover:underline text-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-[#0A1F44] px-3 py-1 rounded text-sm"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <aside className="bg-white w-64 h-full p-6">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="text-right w-full mb-6 text-lg"
            >
              ✕
            </button>

            {/* Profile (MOBILE – ALWAYS SHOWN) */}
            {user && (
              <div
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="flex items-center gap-3 mb-6 cursor-pointer"
              >
                <img
                  src={user.avatar || "/assets/images/placeholder.png"}
                  className="w-10 h-10 rounded-full border"
                  alt="Profile"
                />
                <div>
                  <p className="font-semibold text-[#0A1F44]">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role}
                  </p>
                </div>
              </div>
            )}

            {/* Links */}
            <nav className="flex flex-col gap-4 text-[#0A1F44] font-medium">
              <Link onClick={() => setOpen(false)} to="/">Home</Link>
              <Link onClick={() => setOpen(false)} to="/cart">Cart</Link>

              {isAdmin && (
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
