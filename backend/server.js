const bookingRoutes = require('./Routess/bookingRoutes');

const otpRoutes = require("./Routess/otpRoutes");
const express = require("express");
const mongoose = require("mongoose");


const cors = require("cors");
const authRoutes=require('./Routess/authRoutes')
const poolRoutes=require('./Routess/poolRoutes');




require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
  



const app = express();
app.use(cors());

app.use(express.json({
  type: (req) => {
    return ['POST', 'PUT', 'PATCH'].includes(req.method);
  }
}));






// ✅ Correct import

app.use("/api/auth",authRoutes)
app.use("/api/otp", otpRoutes);


app.use("/api/pools",poolRoutes)
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ DB Error:", err));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

