const mongoose = require("mongoose");

const lotSchema = new mongoose.Schema({
    lotno: { type: String, required: true },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", required: true },
    headId: { type: mongoose.Schema.Types.ObjectId, ref: "Head", default: null },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number, default: () => Date.now() / 1000 },
    updatedAt: { type: Number, default: () => Date.now() / 1000 }
});

module.exports = mongoose.model("Lot", lotSchema);