import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { loginSuccess } from "../features/auth/authSlice";
import axios from "axios";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      dispatch(loginSuccess(res.data)); // store user + JWT
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
      <div className="w-full max-w-md p-6 border rounded shadow-md">
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-4">Register</h1>

        {/* Manual registration */}
        <RegisterForm onSubmit={handleRegister} />
        {loading && <p className="text-[#6B7280] mt-2">Registering...</p>}

        {/* Divider */}
        <div className="my-4 text-center text-[#6B7280] text-sm">OR</div>

        {/* Google registration */}
        <GoogleLoginButton
          onSuccess={(data) => {
            dispatch(loginSuccess(data)); // store user + JWT
            navigate("/"); // redirect after Google login
          }}
        />
      </div>
    </div>
  );
}
