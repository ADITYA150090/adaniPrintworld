const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");

exports.getDashboardStats = async (officerId) => {
    return {
        verifiedLots: await Lot.countDocuments({ officerId, isVerified: true }),
        rejectedLots: await Lot.countDocuments({ officerId, isVerified: false, isDeleted: false }), // Assuming rejected means unverified for now or add specific status check if needed

        pendingLots: await Lot.countDocuments({
            officerId,
            isVerified: false,
            isDeleted: false
        }),

        unverifiedNameplates: await Nameplate.countDocuments({
            createdBy: officerId,
            status: "PENDING",
            isDeleted: false
        }),

        totalNameplates: await Nameplate.countDocuments({
            createdBy: officerId,
            isDeleted: false
        })
    };
};

exports.createNameplate = async (data) => {
    const nameplate = new Nameplate(data);
    return await nameplate.save();
};