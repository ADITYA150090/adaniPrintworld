const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const headSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    tseId: String,
    district: String,
    pincode: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const officerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    number: String,
    address: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

module.exports = {
    Admin: mongoose.model("Admin", adminSchema),
    Head: mongoose.model("Head", headSchema),
    Officer: mongoose.model("Officer", officerSchema),
};