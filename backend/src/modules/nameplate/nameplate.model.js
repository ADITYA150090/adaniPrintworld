// models/certificate.model.js
const mongoose = require("mongoose");

const nameplateSchema = new mongoose.Schema({
    theme: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    houseName: { type: String, required: true },
    selectedImage: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Nameplate", nameplateSchema);