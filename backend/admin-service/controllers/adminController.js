const Admin = require("../models/User");
const Head = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Admin Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });
    res.status(201).json({ msg: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

// Approve Head
exports.approveHead = async (req, res) => {
  try {
    const { headId } = req.params;
    const head = await Head.findById(headId);
    if (!head) return res.status(404).json({ msg: "Head not found" });

    head.approved = true;
    await head.save();
    res.json({ msg: "Head approved successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed", error: err.message });
  }
};
