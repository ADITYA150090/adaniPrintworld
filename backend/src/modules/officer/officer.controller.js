// FILE 2: officer.controller.js
// ============================================
const officerService = require("./officer.service");

// GET /officer/dashboard - Get dashboard stats
exports.dashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await officerService.getDashboardStats(userId);
        
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch dashboard"
        });
    }
};

// POST /officer/lot - Create a new lot
exports.createLot = async (req, res) => {
    try {
        const userId = req.user.id;
        const lot = await officerService.createLot(userId);
        
        res.status(201).json({
            success: true,
            data: lot
        });
    } catch (error) {
        console.error("Error creating lot:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create lot"
        });
    }
};

// GET /officer/lot - Get all lots
exports.getLots = async (req, res) => {
    try {
        const userId = req.user.id;
        const lots = await officerService.getAllLots(userId);
        
        res.status(200).json({
            success: true,
            data: lots
        });
    } catch (error) {
        console.error("Error fetching lots:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch lots"
        });
    }
};

// POST /officer/lot/:lotId/nameplate - Create nameplate
exports.createNameplate = async (req, res) => {
    try {
        const { lotId } = req.params;
        const userId = req.user.id;
        const data = req.body;
        
        const nameplate = await officerService.createNameplate(lotId, data, userId);
        
        res.status(201).json({
            success: true,
            data: nameplate
        });
    } catch (error) {
        console.error("Error creating nameplate:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create nameplate"
        });
    }
};

// GET /officer/lot/:lotId/nameplate - Get nameplates by lot
exports.getNameplates = async (req, res) => {
    try {
        const { lotId } = req.params;
        const nameplates = await officerService.getNameplatesByLot(lotId);
        
        res.status(200).json({
            success: true,
            data: nameplates
        });
    } catch (error) {
        console.error("Error fetching nameplates:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch nameplates"
        });
    }
};

// PATCH /officer/nameplate/:nameplateId/status - Update nameplate status
exports.updateStatus = async (req, res) => {
    try {
        const { nameplateId } = req.params;
        const { status } = req.body;
        
        const nameplate = await officerService.updateNameplateStatus(nameplateId, status);
        
        res.status(200).json({
            success: true,
            data: nameplate
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update status"
        });
    }
};