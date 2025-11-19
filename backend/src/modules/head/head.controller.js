const headService = require("./head.service");

exports.dashboard = async(req, res) => {
    try {
        const data = await headService.getDashboard(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getVerifiedOfficers = async(req, res) => {
    try {
        const officers = await headService.getVerifiedOfficers(req.user.id);
        res.json({ success: true, officers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getUnverifiedOfficers = async(req, res) => {
    try {
        const officers = await headService.getUnverifiedOfficers(req.user.id);
        res.json({ success: true, officers });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.approveOfficer = async(req, res) => {
    try {
        const updated = await headService.approveOfficer(req.params.id);
        res.json({ success: true, officer: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.rejectOfficer = async(req, res) => {
    try {
        await headService.rejectOfficer(req.params.id);
        res.json({ success: true, message: "Officer rejected & deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getUnverifiedLots = async(req, res) => {
    try {
        const lots = await headService.getUnverifiedLots(req.user.id);
        res.json({ success: true, lots });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.approveLot = async(req, res) => {
    try {
        const updated = await headService.approveLot(req.params.id);
        res.json({ success: true, lot: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.rejectLot = async(req, res) => {
    try {
        const updated = await headService.rejectLot(req.params.id);
        res.json({ success: true, lot: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};