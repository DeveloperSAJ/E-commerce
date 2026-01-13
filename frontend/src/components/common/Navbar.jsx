import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  return (
    <nav className="bg-[#0A1F44] text-white p-4 flex justify-between items-center shadow-md">
      {/* Left: Brand */}
      <Link to="/" className="text-xl font-bold tracking-wide flex gap-2">
      <img src="../../public/favicon.svg" alt="Watchify Logo" className="w-8 h-8 animate-pulse"/>
      <p>Watchify</p>
      </Link>

      {/* Center: Navigation links */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        {user && (
          <Link to="/orders" className="hover:underline">
            Orders
          </Link>
        )}
      </div>

      {/* Right: Auth / Profile */}
      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link
              to="/login"
              className="hover:bg-[#6B7280] px-3 py-1 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#0A1F44] px-3 py-1 rounded hover:opacity-90 transition"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={user.avatar || "/assets/images/placeholder.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="text-white font-medium">{user.name || user.email}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

