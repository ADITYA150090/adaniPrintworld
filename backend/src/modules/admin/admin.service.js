const { Head, Officer } = require("../auth/auth.model");

exports.getAdminStats = async() => ({
    totalHeads: await Head.countDocuments(),
    totalOfficers: await Officer.countDocuments(),
    pendingOfficers: await Officer.countDocuments({ approvedByHead: false })
});

exports.getAllHeads = async() => {
    return Head.find().select("-password -verifyToken -verifyTokenExpiry");
};