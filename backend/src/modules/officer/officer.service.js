const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");

exports.getDashboardStats = async(userId) => {
    // Implementation for dashboard stats
};

exports.createLot = async(userId) => {
    // Implementation for creating a lot
};

exports.getAllLots = async(userId) => {
    // Implementation for getting all lots
};

exports.createNameplate = async(lotId, data, userId) => {
    console.log("Service createNameplate - lotId:", lotId, "userId:", userId, "data:", data);
    // Validate lotId
    if (!lotId) {
        throw new Error("Lot ID is required");
    }

    // Check if lot exists and belongs to the user
    let lot = await Lot.findOne({ lotno: lotId });
    console.log("Lot found:", lot);
    if (!lot) {
        // Create the lot if not found
        const OfficerModel = require("../auth/auth.model").Officer;
        const officer = await OfficerModel.findById(userId);
        console.log("Officer found:", officer);
        if (!officer) {
            throw new Error("Officer not found");
        }
        lot = new Lot({
            lotno: lotId,
            officerId: userId,
            headId: officer.headId
        });
        await lot.save();
        console.log("Lot created:", lot);
    }

    // Get officer details
    const OfficerModel = require("../auth/auth.model").Officer;
    const officer = await OfficerModel.findById(userId);
    if (!officer) {
        throw new Error("Officer not found");
    }

    // Create nameplate
    const nameplate = new Nameplate({
        lotId: lot._id,
        officerId: userId,
        headId: officer.headId,
        ...data
    });
    console.log("Creating nameplate:", nameplate);

    await nameplate.save();
    console.log("Nameplate saved:", nameplate);
    return nameplate;
};

exports.getNameplatesByLot = async(lotId) => {
    // Validate lotId
    if (!lotId) {
        throw new Error("Lot ID is required");
    }

    // Find lot by lotno
    const lot = await Lot.findOne({ lotno: lotId });
    if (!lot) {
        throw new Error("Lot not found");
    }

    // Get nameplates for the lot
    const nameplates = await Nameplate.find({ lotId: lot._id });
    return nameplates;
};

exports.updateNameplateStatus = async(nameplateId, status) => {
    // Implementation for updating nameplate status
};

exports.createLot = async(userId) => {
    const OfficerModel = require("../auth/auth.model").Officer;
    const officer = await OfficerModel.findById(userId);

    if (!officer) {
        throw new Error("Officer not found");
    }

    // Find the last lot created by this officer
    const lastLot = await Lot.find({ officerId: userId })
        .sort({ createdAt: -1 })
        .limit(1);

    let nextLotNumber = 1;

    if (lastLot.length > 0) {
        nextLotNumber = Number(lastLot[0].lotno) + 1;
    }

    const lot = new Lot({
        lotno: nextLotNumber.toString(),
        officerId: userId,
        headId: officer.headId
    });

    await lot.save();
    return lot;
};