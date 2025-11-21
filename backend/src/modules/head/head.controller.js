const headService = require("./head.service");

exports.getDashboard = async (req, res) => {
    try {
        const stats = await headService.getDashboard(req.user._id);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOfficers = async (req, res) => {
    try {
        const officers = await headService.getOfficers(req.user._id);
        res.json(officers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOfficerLots = async (req, res) => {
    try {
        const lots = await headService.getOfficerLots(req.params.officerId);
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyNameplate = async (req, res) => {
    try {
        const { status } = req.body; // APPROVED or REJECTED
        const nameplate = await headService.verifyNameplate(req.params.nameplateId, status);
        res.json(nameplate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyLot = async (req, res) => {
    try {
        const { status } = req.body; // APPROVED or REJECTED
        const lot = await headService.verifyLot(req.params.lotId, status);
        res.json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUnverifiedLots = async (req, res) => {
    try {
        const lots = await headService.getUnverifiedLots(req.user._id);
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveOfficer = async (req, res) => {
    try {
        const officer = await headService.approveOfficer(req.params.officerId);
        res.json(officer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectOfficer = async (req, res) => {
    try {
        await headService.rejectOfficer(req.params.officerId);
        res.json({ message: "Officer rejected" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};