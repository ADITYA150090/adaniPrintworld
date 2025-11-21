const Lot = require("./lot.model");
const { Officer } = require("../auth/auth.model");

exports.createLot = async (data) => {
    const { lotno, officerId, tseId, headId } = data;
    
    // Check if lot number already exists
    const existingLot = await Lot.findOne({ lotno });
    if (existingLot) {
        throw new Error("Lot number already exists");
    }

    const lot = new Lot({
        lotno,
        officerId,
        tseId,
        headId
    });

    return await lot.save();
};

exports.getLots = async (filter) => {
    return await Lot.find({ ...filter, isDeleted: false }).sort({ createdAt: -1 });
};

exports.getLotById = async (id) => {
    return await Lot.findById(id).populate("officerId", "name email").populate("tseId", "name email");
};

exports.updateLot = async (id, data) => {
    return await Lot.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteLot = async (id) => {
    return await Lot.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
