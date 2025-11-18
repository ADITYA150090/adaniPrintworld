const mongoose = require("mongoose");

const lotSchema = new mongoose.Schema({
    lotNo: { type: Number, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lot", lotSchema);