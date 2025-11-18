const service = require("./officer.service");

exports.dashboard = async(req, res) => {
    try {
        const data = await service.getDashboardStats(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.createLot = async(req, res) => {
    try {
        const data = await service.createLot(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getLots = async(req, res) => {
    try {
        const data = await service.getAllLots(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.createNameplate = async(req, res) => {
    try {
        const { lotId } = req.params;
        const data = await service.createNameplate(lotId, req.body);
        res.json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getNameplates = async(req, res) => {
    try {
        const { lotId } = req.params;
        const data = await service.getNameplatesByLot(lotId);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateStatus = async(req, res) => {
    try {
        const { nameplateId } = req.params;
        const { status } = req.body;
        const data = await service.updateNameplateStatus(nameplateId, status);
        res.json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};