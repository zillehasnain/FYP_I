const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Brand = require("./models/Brand");

dotenv.config();

const app = express(); // Move this up

// --- MIDDLEWARE ---
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173", 
      "https://victorious-ground-0443e4d00.7.azurestaticapps.net",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ SYSTEM: Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ ERROR: Connection failed", err));

// --- HELPER: UNIQUE VOUCHER GENERATOR ---
const generateVoucher = (brand) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 4; i++)
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  return `BURST-${brand.toUpperCase()}-${random}`;
};

// --- AUTHENTICATION ROUTES ---

// Register User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Register attempt with email:", email, "username:", username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log("User registered successfully:", user._id);
    res.status(201).json({ message: "Identity Established" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(400).json({ error: "Email already registered" });
  }
});

// Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Identity not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    // Include role in the token and response
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    console.log("Login successful for user:", user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // This will be "admin" for ZILLE
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});
// --- ADMIN & DYNAMIC BRAND ROUTES ---

// 1. Admin: Add New Brand with Quizzes
app.post("/api/admin/add-brand", async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json({ message: "Protocol Deployed: Brand & Quiz Active" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to deploy brand node: " + err.message });
  }
});

// 2. Fetch All Brands (For Home/Nexus Page)
app.get("/api/brands", async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: "Nexus Link Failure" });
  }
});

// 3. Fetch Single Brand (For QuizRoom)
app.get("/api/brands/:brandId", async (req, res) => {
  try {
    const brand = await Brand.findOne({ brandId: req.params.brandId });
    if (!brand) return res.status(404).json({ error: "Node not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: "Decryption failure" });
  }
});

// 4. Update Existing Brand Node
app.put("/api/admin/update-brand/:id", async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({ message: "PROTOCOL UPDATED: Node Reconfigured", updatedBrand });
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

// 5. Delete Brand Node
app.delete("/api/admin/delete-brand/:id", async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "NODE TERMINATED: Brand removed from Nexus" });
  } catch (err) {
    res.status(400).json({ error: "Deletion failed" });
  }
});

// --- VAULT & LOOT ROUTES ---

// Save Quiz Result & Generate Unique Voucher
app.post("/api/user/save-loot", async (req, res) => {
  const { userId, brandId, discountAmount, color } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not in system" });

    const uniqueCode = generateVoucher(brandId);

    const newVoucher = {
      brand: brandId.toUpperCase(),
      code: uniqueCode,
      discount: discountAmount,
      color: color, // Passed from frontend (e.g., #3b82f6 for Nexus)
      date: new Date(),
    };

    user.vouchers.push(newVoucher);
    user.points += 100; // Reward for completing quiz
    await user.save();

    res.json({ message: "Voucher Saved to Vault", voucher: newVoucher });
  } catch (err) {
    res.status(500).json({ error: "System fault during decryption" });
  }
});

// Get User Dashboard Data
app.get("/api/user/dashboard/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({
      username: user.username,
      points: user.points,
      vouchers: user.vouchers,
    });
  } catch (err) {
    res.status(500).json({ error: "Access Denied" });
  }
});
// Get Top 10 Players for Leaderboard
app.get("/api/leaderboard", async (req, res) => {
  try {
    // Find users, sort by points (descending), limit to 10
    const topPlayers = await User.find()
      .select("username points") // Only send name and points for security
      .sort({ points: -1 })
      .limit(10);

    res.json(topPlayers);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch Hall of Fame" });
  }
});
// server/server.js
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server online on Azure port ${PORT}`);
});
