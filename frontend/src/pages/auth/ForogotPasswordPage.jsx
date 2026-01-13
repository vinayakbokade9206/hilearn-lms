import { useState } from "react";
import { sendOtp } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOtp(email);
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D6D8F2]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

