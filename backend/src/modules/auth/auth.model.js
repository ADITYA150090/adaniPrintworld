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
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    tseId: { type: String, unique: true }, // auto filled
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
});



const officerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    tseId: { type: String, required: true }, // must match a Head
    headId: { type: mongoose.Schema.Types.ObjectId, ref: "Head" }, // attach later
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