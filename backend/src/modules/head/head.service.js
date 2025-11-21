const { Head, Officer } = require("../auth/auth.model");
const Lot = require("../lot/lot.model");
const Nameplate = require("../nameplate/nameplate.model");

// DASHBOARD
exports.getDashboard = async (headId) => {
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

exports.getOfficers = async (headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");
    return await Officer.find({ tseId: head.tseId, isDeleted: false });
};

exports.getOfficerLots = async (officerId) => {
    return await Lot.find({ officerId, isDeleted: false }).populate("officerId", "name");
};

exports.verifyNameplate = async (nameplateId, status) => {
    return await Nameplate.findByIdAndUpdate(nameplateId, { status }, { new: true });
};

exports.verifyLot = async (lotId, status) => {
    const isVerified = status === "APPROVED";
    return await Lot.findByIdAndUpdate(lotId, { isVerified, status }, { new: true });
};

// LIST UNVERIFIED LOTS
exports.getUnverifiedLots = async (headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Lot.find({
        tseId: head.tseId,
        isVerified: false,
        isDeleted: false
    }).populate("officerId", "name");
};

// APPROVE LOT
exports.approveLot = async (lotId) => {
    return Lot.findByIdAndUpdate(
        lotId, { isVerified: true, status: "Approved" }, { new: true }
    );
};

// REJECT LOT
exports.rejectLot = async (lotId) => {
    return Lot.findByIdAndUpdate(
        lotId, { isVerified: false, status: "Rejected" }, { new: true }
    );
};


// Verified officers
exports.getVerifiedOfficers = async (headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Officer.find({ tseId: head.tseId, approvedByHead: true });
};

// Unverified officers
exports.getUnverifiedOfficers = async (headId) => {
    const head = await Head.findById(headId);
    if (!head) throw new Error("Head not found");

    return Officer.find({ tseId: head.tseId, approvedByHead: false });
};

// Approve / Reject officers
exports.approveOfficer = async (officerId) => {
    return Officer.findByIdAndUpdate(officerId, { approvedByHead: true }, { new: true });
};

exports.rejectOfficer = async (officerId) => {
    return Officer.findByIdAndDelete(officerId);
};