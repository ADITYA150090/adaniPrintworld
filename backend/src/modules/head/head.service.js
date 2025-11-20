const { Head, Officer } = require("../auth/auth.model");
const Lot = require("../lot/lot.model");



// DASHBOARD
exports.getDashboard = async(headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    const tseId = head.tseId;
    if (!tseId) throw new Error("Head has no TSE assigned");

    // Officers under this TSE
    const officers = await Officer.find({ tseId, isDeleted: false });

    const totalOfficers = officers.length;
    const unverifiedOfficers = officers.filter(o => !o.approvedByHead).length;

    // Pending lots (NOT verified)
    const pendingLots = await Lot.countDocuments({
        tseId,
        isVerified: false,
        isDeleted: false
    });

    return {
        totalOfficers,
        pendingLots,
        unverifiedOfficers
    };
};

// LIST UNVERIFIED LOTS
exports.getUnverifiedLots = async(headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Lot.find({
        tseId: head.tseId,
        isVerified: false,
        isDeleted: false
    });
};

// APPROVE LOT
exports.approveLot = async(lotId) => {
    return Lot.findByIdAndUpdate(
        lotId, { isVerified: true, status: "Approved" }, { new: true }
    );
};

// REJECT LOT
exports.rejectLot = async(lotId) => {
    return Lot.findByIdAndUpdate(
        lotId, { isVerified: false, status: "Rejected" }, { new: true }
    );
};


// Verified officers
exports.getVerifiedOfficers = async(headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Officer.find({ tseId: head.tseId, approvedByHead: true });
};

// Unverified officers
exports.getUnverifiedOfficers = async(headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Officer.find({ tseId: head.tseId, approvedByHead: false });
};

// Approve / Reject officers
exports.approveOfficer = async(officerId) => {
    return Officer.findByIdAndUpdate(officerId, { approvedByHead: true }, { new: true });
};

exports.rejectOfficer = async(officerId) => {
    return Officer.findByIdAndDelete(officerId);
};

// Unverified lots
exports.getUnverifiedLots = async(headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Lot.find({ tseId: head.tseId, isVerified: false });
};

// Approve / Reject lots
exports.approveLot = async(lotId) => {
    return Lot.findByIdAndUpdate(lotId, { isVerified: true, status: "Approved" }, { new: true });
};

exports.rejectLot = async(lotId) => {
    return Lot.findByIdAndUpdate(lotId, { isVerified: false, status: "Rejected" }, { new: true });
};