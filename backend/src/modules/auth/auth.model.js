const mongoose = require("mongoose");

// ADMIN
const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: true },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// HEAD
const headSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    tseId: { type: String, unique: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// OFFICER
const officerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    tseId: { type: String, required: true },
    headId: { type: mongoose.Schema.Types.ObjectId, ref: "Head" },
    password: { type: String, required: true },
    approvedByHead: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

module.exports = {
    Admin: mongoose.model("Admin", adminSchema),
    Head: mongoose.model("Head", headSchema),
    Officer: mongoose.model("Officer", officerSchema),
};