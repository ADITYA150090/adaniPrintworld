const { Head, Admin } = require("../auth/auth.model");
const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");
const archiver = require("archiver");
// const { createCanvas } = require("canvas"); // Removed due to environment issues
const fs = require("fs");
const path = require("path");

exports.getAllHeads = async () => {
    return await Head.find({ isVerified: true });
};

exports.getVerifiedLots = async () => {
    return await Lot.find({ isVerified: true, status: "Approved" }).populate("officerId", "name").populate("headId", "name");
};

exports.downloadLot = async (lotId, res) => {
    const lot = await Lot.findById(lotId).populate("officerId").populate("headId");
    if (!lot) throw new Error("Lot not found");

    const nameplates = await Nameplate.find({ lotId, isDeleted: false });

    const archive = archiver("zip", {
        zlib: { level: 9 }
    });

    res.attachment(`Lot_${lot.lotno}.zip`);
    archive.pipe(res);

    // Generate JSON data
    const lotData = {
        lot: lot,
        nameplates: nameplates
    };
    archive.append(JSON.stringify(lotData, null, 2), { name: "data.json" });

    // Generate Images (Placeholder)
    for (const np of nameplates) {
        // Placeholder for image generation
        const placeholderContent = `Name: ${np.name}\nAddress: ${np.address}\nHouse: ${np.houseName}`;
        archive.append(placeholderContent, { name: `images/${np._id}.txt` });
    }

    await archive.finalize();
};