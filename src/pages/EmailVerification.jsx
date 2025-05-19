import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get poolId from route state
  const poolId = location.state?.poolId || null;

  const handleSendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      setMessage(res.data.message);

      // Set emailVerified flag
      localStorage.setItem("emailVerified", "true");

      // Redirect to booking page or homepage if poolId missing
      if (poolId) {
        navigate(`/book/${poolId}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Email Verification</h2>

      <input
        type="email"
        placeholder="Enter your Gmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 border rounded"
        disabled={otpSent}
      />

      {!otpSent ? (
        <button
          onClick={handleSendOTP}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mt-4 mb-4 p-3 border rounded"
          />
          <button
            onClick={handleVerifyOTP}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
        </>
      )}

      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
}
