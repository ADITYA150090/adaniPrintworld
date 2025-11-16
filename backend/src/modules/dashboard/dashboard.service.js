const { Admin, Head, Officer } = require("../auth/auth.model");

exports.getAdminStats = async() => {
    return {
        totalHeads: await Head.countDocuments(),
        totalOfficers: await Officer.countDocuments(),
        pendingOfficers: await Officer.countDocuments({ approvedByHead: false })
    };
};

exports.getHeadStats = async(headId) => {
    const officers = await Officer.find({ headId });

    return {
        totalOfficers: officers.length,
        pendingApprovals: await Officer.countDocuments({ headId, approvedByHead: false }),
        officers
    };
};

exports.getOfficerInfo = async(officerId) => {
    const officer = await Officer.findById(officerId).select("-password");
    return officer;
};