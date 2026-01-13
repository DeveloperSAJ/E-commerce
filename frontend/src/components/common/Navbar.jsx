import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logoutUser } = useAuth();

  return (
    <nav className="bg-[#0A1F44] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        Watchify
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-[#D1D5DB] transition">
          Home
        </Link>

        <Link to="/cart" className="hover:text-[#D1D5DB] transition">
          Cart
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-[#D1D5DB] transition"
          >
            Admin
          </Link>
        )}

        {!isAuthenticated ? (
          <Link
            to="/login"
            className="bg-white text-[#0A1F44] px-4 py-1 rounded hover:bg-[#D1D5DB]"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logoutUser}
            className="border border-white px-4 py-1 rounded hover:bg-white hover:text-[#0A1F44]"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
