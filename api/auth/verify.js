const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../server/models/User.Model");

// MongoDB connection
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    // Extract token from cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Access token invalid" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(401).json({ message: "Not authenticated" });
  }
};
