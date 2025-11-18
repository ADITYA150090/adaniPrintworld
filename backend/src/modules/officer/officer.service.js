const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");

exports.createLot = async(officerId) => {
    const lastLot = await Lot.findOne().sort({ lotNo: -1 });
    const newLotNo = lastLot ? lastLot.lotNo + 1 : 1;

    const newLot = await Lot.create({
        lotNo: newLotNo,
        createdBy: officerId,
    });

    return newLot;
};

exports.getAllLots = async(officerId) => {
    return Lot.find({ createdBy: officerId }).sort({ createdAt: -1 });
};

exports.createNameplate = async(lotId, payload) => {
    const lot = await Lot.findById(lotId);
    if (!lot) {
        throw new Error("Lot not found");
    }
    return Nameplate.create({ lotId, ...payload });
};

exports.getNameplatesByLot = async(lotId) => {
    return Nameplate.find({ lotId }).sort({ createdAt: -1 });
};

exports.updateNameplateStatus = async(id, status) => {
    return Nameplate.findByIdAndUpdate(id, { status }, { new: true });
};

exports.getDashboardStats = async(officerId) => {
    const lots = await Lot.find({ createdBy: officerId }).select("_id");
    const lotIds = lots.map((l) => l._id);

    return {
        unverified: await Nameplate.countDocuments({ lotId: { $in: lotIds }, status: "unverified" }),
        verified: await Nameplate.countDocuments({ lotId: { $in: lotIds }, status: "verified" }),
        ontransit: await Nameplate.countDocuments({ lotId: { $in: lotIds }, status: "ontransit" }),
        delivered: await Nameplate.countDocuments({ lotId: { $in: lotIds }, status: "delivered" }),
    };
};