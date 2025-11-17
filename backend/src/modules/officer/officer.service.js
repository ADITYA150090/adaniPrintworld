const { Officer } = require("../auth/auth.model");

exports.getOfficerInfo = async(officerId) => {
    return Officer.findById(officerId).select("-password -verifyToken -verifyTokenExpiry");
};