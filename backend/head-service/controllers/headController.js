const Head = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // optional if talking to officer service (later via gateway)

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Head.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const head = await Head.create({ name, email, password });
    res.json({ msg: "Signup successful, wait for Admin approval", head });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const head = await Head.findOne({ email, password });
    if (!head) return res.status(400).json({ msg: "Invalid credentials" });

    if (!head.isApproved)
      return res.status(403).json({ msg: "Not approved by Admin yet" });

    const token = jwt.sign(
      { id: head._id, role: head.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Login successful", token, head });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH (Head approves Officer)
exports.approveOfficer = async (req, res) => {
  try {
    // Ye tab kaam karega jab tu gateway se call karegi (abhi same DB flow me test kar)
    // Officer approval ke liye baad me gateway route use hoga
    res.json({ msg: "Officer approval route ready (will work via gateway)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
