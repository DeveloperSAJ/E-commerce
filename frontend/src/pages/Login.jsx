import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginSuccess } from "../features/auth/authSlice";
import LoginForm from "../components/auth/LoginForm";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth); // get error from state
  const navigate = useNavigate();

  // Handle Google login success
  const handleGoogleSuccess = (data) => {
    dispatch(loginSuccess(data)); // store user + JWT
    navigate("/"); // redirect to home or dashboard
    toast.success("Login successful!");
  };

  // Handle Google login error
  const handleGoogleError = (err) => {
    console.error("Google login error:", err);
    toast.error("Google login failed. Please try again.");
  };

  // Handle email/password login submission
  const handleLogin = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md border rounded-xl p-8 shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-[#0A1F44] mb-6 text-center">
          Welcome Back
        </h2>

        {/* Email/password login */}
        <LoginForm loading={loading} onSubmit={handleLogin} />

        {error && (
          <div className="mt-2 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="my-4 text-center text-gray-400 text-sm font-medium">OR</div>

        {/* Google login */}
        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          className="w-full py-2 px-4 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-[#0A1F44]"
        />

        {/* Register link */}
        <p className="mt-6 text-center text-gray-500 text-sm">
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
