import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../features/auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, token, loading: reduxLoading } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Sync local state with Redux user (important after login/register)
  useEffect(() => {
    setName(user?.name || "");
    setAvatar(user?.avatar || "");
  }, [user]);

  // Handle file upload for avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await dispatch(updateUserProfile({ name, avatar })).unwrap();
      setSuccess(true);
    } catch (err) {
      setError(err || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Profile</h2>

      <div className="border rounded p-6 bg-[#FFFFFF] shadow-sm">
        {/* Avatar */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border border-[#D1D5DB]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm text-[#6B7280]"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-[#6B7280] mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#D1D5DB] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[#6B7280] mb-1">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full border border-[#D1D5DB] rounded px-3 py-2 bg-[#F9FAFB] cursor-not-allowed text-[#6B7280]"
          />
        </div>

        {/* Role / Status */}
        <div className="mb-4">
          <span className="text-[#6B7280] font-medium">Status: </span>
          <span
            className={`font-bold ${
              user?.role === "admin" ? "text-red-600" : "text-green-600"
            }`}
          >
            {user?.role === "admin" ? "Admin" : "User"}
          </span>
        </div>

        {/* Update & Logout buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleUpdate}
            disabled={loading || reduxLoading}
            className="bg-[#0A1F44] text-white px-4 py-2 rounded hover:bg-[#08203a]"
          >
            {loading || reduxLoading ? "Updating..." : "Update Profile"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#D1D5DB] text-[#0A1F44] px-4 py-2 rounded hover:bg-[#BFC5CB]"
          >
            Logout
          </button>
        </div>

        {/* Success / Error messages */}
        {success && <p className="mt-3 text-green-600">Profile updated!</p>}
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
