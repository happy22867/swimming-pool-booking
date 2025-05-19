const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });
  console.log("dfhfla");  
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    // ✅ This line was missing!
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isAdmin) return res.status(403).json({ message: "Access Denied: Admins only" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyAdmin;
