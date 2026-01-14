import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin"; // ✅ use role instead of isAdmin

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    logoutUser,
  };
}
