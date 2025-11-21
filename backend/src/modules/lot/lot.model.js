// lot.model.js
const mongoose = require("mongoose");

const lotSchema = new mongoose.Schema({
    lotno: { type: String, required: true },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", required: true },
    tseId: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", required: true },
    headId: { type: mongoose.Schema.Types.ObjectId, ref: "Head", default: null },

    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }, // TSE will verify this

    createdAt: { type: Number, default: () => Date.now() / 1000 },
    updatedAt: { type: Number, default: () => Date.now() / 1000 }
});

module.exports = mongoose.model("Lot", lotSchema);