import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location=useLocation();
  let booking = location.state?.booking;

  // Dummy booking data fallback
  booking = booking || {
    poolName: "Blue Lagoon Pool",
    date: "2025-05-25",
    time: "4:00 PM - 5:00 PM",
    amount: 299,
  };

  const [message, setMessage] = useState("");

  const upiId = "yourupiid@okaxis"; // Replace with your actual UPI ID
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupiid@okaxis&pn=YourName&am=" + booking.amount;
const handleConfirmPayment = async () => {
  setMessage("Processing your payment...");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
  setMessage("You are not logged in. Please login first.");
  return;
}

    const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
       body: JSON.stringify(bookingData),
      // maybe send some payment info if needed, else no body
    });



    const data = await response.json();

    if (response.ok) {
      setMessage("Payment confirmed! Redirecting...");
      setTimeout(() => {
        navigate(`/booking-confirmation/${data.booking._id}`, {
          state: { booking: data.booking },
        });
      }, 1500);
    } else {
      setMessage("Payment confirmation failed: " + data.message);
    }
  } catch (error) {
    setMessage("Error occurred: " + error.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-800 to-red-700 p-8 flex flex-col justify-center items-center font-sans text-white">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-10 max-w-md w-full shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8">Payment via Google Pay</h1>
        <p className="mb-4 text-lg">
          Please pay <span className="font-semibold">₹{booking.amount}</span> for your booking of{" "}
          <span className="font-semibold">{booking.poolName}</span>
        </p>

        <p className="mb-2 text-xl font-semibold">Scan this QR code to pay:</p>
        <img src={qrCodeUrl} alt="UPI QR Code" className="mx-auto mb-6 rounded-xl shadow-lg" />

        <p className="mb-6 text-lg">
          Or use UPI ID: <span className="font-mono font-bold text-xl">{upiId}</span>
        </p>

        <button
          onClick={handleConfirmPayment}
          className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 font-semibold text-lg transition"
        >
          ✅ I Have Paid
        </button>

        {message && <p className="mt-4 text-green-300 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
