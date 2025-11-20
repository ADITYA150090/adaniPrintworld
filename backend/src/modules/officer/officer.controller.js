// officer.controller.js
const officerService = require("./officer.service");

// GET /officer/dashboard
exports.dashboard = async(req, res) => {
    try {
        const data = await officerService.getDashboardStats(req.user.id);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /officer/lot
exports.createLot = async(req, res) => {
    try {
        const lot = await officerService.createLot(req.user.id);
        res.status(201).json({ success: true, data: lot });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET /officer/lot
exports.getLots = async(req, res) => {
    try {
        const lots = await officerService.getAllLots(req.user.id);
        res.status(200).json({ success: true, data: lots });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /officer/lot/:lotId/nameplate
exports.createNameplate = async(req, res) => {
    try {
        const nameplate = await officerService.createNameplate(req.params.lotId, req.body, req.user.id);
        res.status(201).json({ success: true, data: nameplate });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET /officer/lot/:lotId/nameplate
exports.getNameplates = async(req, res) => {
    try {
        const plates = await officerService.getNameplatesByLot(req.params.lotId);
        res.status(200).json({ success: true, data: plates });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// PATCH /officer/nameplate/:nameplateId/status
exports.updateStatus = async(req, res) => {
    try {
        const result = await officerService.updateNameplateStatus(req.params.nameplateId, req.body.status);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};