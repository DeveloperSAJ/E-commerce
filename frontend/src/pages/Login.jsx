import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginSuccess } from "../features/auth/authSlice";
import LoginForm from "../components/auth/LoginForm";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  // Handle Google login success
  const handleGoogleSuccess = (data) => {
    dispatch(loginSuccess(data)); // store user + JWT
    navigate("/"); // redirect to home or dashboard
    toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
      <div className="w-full max-w-md border rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-[#0A1F44] mb-4">
          Welcome Back
        </h2>

        {/* Email/password login */}
        <LoginForm
          loading={loading}
          onSubmit={(data) => dispatch(loginUser(data))}
        />

        <div className="my-4 text-center text-[#6B7280] text-sm">OR</div>

        {/* Google login */}
        <GoogleLoginButton onSuccess={handleGoogleSuccess} />

        {/* Register link */}
        <p className="mt-4 text-center text-[#6B7280] text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#0A1F44] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
