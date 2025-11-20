// officer.service.js
const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");
const { Officer } = require("../auth/auth.model");

exports.getDashboardStats = async(userId) => {
    const totalLots = await Lot.countDocuments({ officerId: userId, isDeleted: false });
    const totalNameplates = await Nameplate.countDocuments({ officerId: userId, isDeleted: false });

    return {
        totalLots,
        totalNameplates,
        pendingNameplates: await Nameplate.countDocuments({ officerId: userId, status: "pending", isDeleted: false }),
        approvedNameplates: await Nameplate.countDocuments({ officerId: userId, status: "approved", isDeleted: false }),
        rejectedNameplates: await Nameplate.countDocuments({ officerId: userId, status: "rejected", isDeleted: false })
    };
};

// CREATE LOT
exports.createLot = async(userId) => {
    const officer = await Officer.findById(userId);
    if (!officer) throw new Error("Officer not found");

    if (!officer.tseId) throw new Error("Officer does not have a TSE assigned");

    const lastLot = await Lot.findOne({ officerId: userId }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastLot) {
        nextNumber = parseInt(lastLot.lotno.replace("LOT", "")) + 1;
    }

    const lot = await Lot.create({
        lotno: "LOT" + String(nextNumber).padStart(3, "0"),
        officerId: userId,
        tseId: officer.tseId, // Keep TSE string
        headId: officer.headId || null
    });

    return lot.toObject();
};

// GET ALL LOTS
exports.getAllLots = async(userId) => {
    return Lot.find({ officerId: userId, isDeleted: false }).sort({ createdAt: -1 });
};

// CREATE NAMEPLATE
exports.createNameplate = async(lotno, data, userId) => {
    const lot = await Lot.findOne({ lotno, isDeleted: false });
    if (!lot) throw new Error("Lot not found");

    if (lot.officerId.toString() !== userId.toString()) {
        throw new Error("Unauthorized: Lot does not belong to this officer");
    }

    const officer = await Officer.findById(userId);

    const nameplate = await Nameplate.create({
        lotId: lot._id,
        officerId: userId,
        headId: officer.headId || null,
        ...data
    });

    return nameplate;
};

// GET NAMEPLATES BY LOT
exports.getNameplatesByLot = async(lotno) => {
    const lot = await Lot.findOne({ lotno, isDeleted: false });
    if (!lot) throw new Error("Lot not found");

    return Nameplate.find({ lotId: lot._id, isDeleted: false }).sort({ createdAt: -1 });
};

// UPDATE STATUS
exports.updateNameplateStatus = async(nameplateId, status) => {
    const valid = ["pending", "approved", "rejected"];
    if (!valid.includes(status)) throw new Error("Invalid status");

    const updated = await Nameplate.findOneAndUpdate({ _id: nameplateId, isDeleted: false }, { status, updatedAt: Date.now() / 1000 }, { new: true });

    if (!updated) throw new Error("Nameplate not found");

    return updated;
};