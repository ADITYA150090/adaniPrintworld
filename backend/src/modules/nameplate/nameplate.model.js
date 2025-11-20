const mongoose = require("mongoose");

const nameplateSchema = new mongoose.Schema({
    lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
    officerId: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", required: true },
    headId: { type: mongoose.Schema.Types.ObjectId, ref: "Head", required: false },
    name: { type: String, required: true },
    address: { type: String, required: true },
    houseName: { type: String, required: true },
    theme: { type: String, required: true },
    selectedImage: { type: String, required: true },
    nameStyle: { type: Object, required: true },
    addressStyle: { type: Object, required: true },
    houseStyle: { type: Object, required: true },
    status: { type: String, enum: ["unverified", "verified", "ontransit", "delivered"], default: "unverified" },
    approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Officer", default: null },
    approvedAt: { type: Number, default: null },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number, default: () => Date.now() / 1000 },
    updatedAt: { type: Number, default: () => Date.now() / 1000 }
});

module.exports = mongoose.model("Nameplate", nameplateSchema);