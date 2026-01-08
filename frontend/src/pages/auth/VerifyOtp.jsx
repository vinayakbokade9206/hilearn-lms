import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/authService";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await verifyOtp({
      email: state.email,
      otp,
      newPassword: password,
    });

    alert("Password reset successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D6D8F2]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 rounded-lg border"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg border"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
