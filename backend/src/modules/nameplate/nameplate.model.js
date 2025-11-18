const mongoose = require("mongoose");
const nameplateSchema = new mongoose.Schema({
    lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },

    theme: String,
    name: String,
    address: String,
    houseName: String,
    selectedImage: String,

    nameStyle: {
        color: String,
        fontSize: Number,
        fontWeight: String,
        fontStyle: String,
        fontFamily: String
    },
    addressStyle: {
        color: String,
        fontSize: Number,
        fontWeight: String,
        fontStyle: String,
        fontFamily: String
    },
    houseStyle: {
        color: String,
        fontSize: Number,
        fontWeight: String,
        fontStyle: String,
        fontFamily: String
    },

    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Nameplate", nameplateSchema);