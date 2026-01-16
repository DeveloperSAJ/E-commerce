import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (admin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
