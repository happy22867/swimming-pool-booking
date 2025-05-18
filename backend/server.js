const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const AuthRoutes=require('../Routes/AuthRoutes')



require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());



// ✅ Correct import

app.use("/api/pools",AuthRoutes)

const PoolRoutes=require('../Routes/PoolRoutes');
app.use("/api/pools",PoolRoutes)

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

