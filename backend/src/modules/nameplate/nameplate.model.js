const mongoose = require("mongoose");

const textStyleSchema = new mongoose.Schema({
    value: { type: String, required: true },
    fontFamily: { type: String, default: "Arial" },
    fontSize: { type: Number, default: 24 },
    fontColor: { type: String, default: "#000000" },
    styles: {
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false }
    }
});

const nameplateSchema = new mongoose.Schema({
    ownerName: { type: textStyleSchema, required: true },
    houseName: { type: textStyleSchema, required: true },
    address: { type: textStyleSchema, required: true },
    lotNumber: { type: String, required: true }, // Added lotNumber
    backgroundColor: { type: String, default: "#FFFFFF" },
    approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Nameplate", nameplateSchema);