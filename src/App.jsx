
import { Routes, Route } from "react-router-dom";
// Pages
import BookPool from "./pages/BookPool";

import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

import NotFoundPage from "./pages/NotFoundPage";


import Signup from "./pages/SignUp";
import HomePage from "./pages/Homepage";
import PoolsPage from "./pages/OnlyPools";
import AddPoolPage from "./components/homepage/AddPoolPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBooking";
import Feedback from "./pages/Feedback";
import Invoice from "./pages/Invoice";
import Payment from "./pages/Payment";

export default function App() {
  return (
   
      
      <Routes>
        <Route path="/add-pool" element={<AddPoolPage />} />

        <Route  path="/" element={<HomePage />} />
           <Route path="/pools" element={<PoolsPage />} />
        <Route  path="/contact" element={<ContactPage />} />
         

        <Route  path="/login" element={<LoginPage />} />

        <Route  path="/signup" element={<Signup />} />
        <Route  path="*" element={<NotFoundPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation/>} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/payment" element={<Payment />} />
       

      </Routes>
    
  );
}
