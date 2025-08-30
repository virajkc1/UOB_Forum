const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter Email & Password" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Not user found" });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; HttpOnly; Path=/; Max-Age=1800; SameSite=None; Secure`
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ message: "Login failed" });
  }
};
