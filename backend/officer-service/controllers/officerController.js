const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Officer signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const officer = await User.create({ name, email, password: hashed, role: "officer" });

    res.status(201).json({ msg: "Signup success! Wait for Head approval", officer });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

// Officer login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const officer = await User.findOne({ email, role: "officer" });
    if (!officer) return res.status(404).json({ msg: "Officer not found" });
    if (!officer.approved) return res.status(403).json({ msg: "Not approved by Head yet" });

    const match = await bcrypt.compare(password, officer.password);
    if (!match) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: officer._id, role: officer.role }, process.env.JWT_SECRET);
    res.json({ msg: "Login success", token, officer });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

// Patch approve (Head only)
exports.approveOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    const officer = await User.findById(id);
    if (!officer) return res.status(404).json({ msg: "Officer not found" });

    officer.approved = true;
    await officer.save();
    res.json({ msg: "Officer approved successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed", error: err.message });
  }
};
