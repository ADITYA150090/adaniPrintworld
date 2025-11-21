const mongoose = require("mongoose");

const nameplateSchema = new mongoose.Schema({
    lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // TE
    tseId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // linked TSE

    // Nameplate data
    name: { type: String, required: true },
    address: { type: String, required: true },
    houseName: { type: String, required: true },

    theme: { type: String, required: true },
    selectedImage: { type: String, required: true },

    nameStyle: { type: Object, required: true },
    addressStyle: { type: Object, required: true },
    houseStyle: { type: Object, required: true },

    // Status
    status: {
        type: String,
        enum: ["PENDING", "TSE_APPROVED", "REJECTED", "PRINTED"],
        default: "PENDING"
    },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    approvedAt: { type: Date, default: null },

    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("Nameplate", nameplateSchema);