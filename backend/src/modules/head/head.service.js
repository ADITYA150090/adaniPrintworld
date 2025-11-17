const { Officer } = require("../auth/auth.model");

exports.getHeadStats = async(headId) => ({
    totalOfficers: await Officer.countDocuments({ headId }),
    pendingOfficers: await Officer.countDocuments({ headId, approvedByHead: false }),
    officers: await Officer.find({ headId }).select("-password")
});

exports.approveOfficer = async(officerId, headId) => {
    const officer = await Officer.findOne({ _id: officerId, headId });

    if (!officer) throw new Error("Officer not found under your team");

    officer.approvedByHead = true;
    officer.isVerified = true;
    await officer.save();

    return "Officer approved successfully";
};