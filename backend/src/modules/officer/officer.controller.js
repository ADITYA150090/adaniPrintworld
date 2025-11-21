const officerService = require("./officer.service");
const lotService = require("../lot/lot.service");

exports.getDashboard = async (req, res) => {
    try {
        // Assuming req.user contains the authenticated officer's ID
        const stats = await officerService.getDashboardStats(req.user._id);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLot = async (req, res) => {
    try {
        const data = {
            ...req.body,
            officerId: req.user._id,
            tseId: req.user.tseId // Assuming officer has tseId in their profile
        };
        const lot = await lotService.createLot(data);
        res.status(201).json(lot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMyLots = async (req, res) => {
    try {
        const lots = await lotService.getLots({ officerId: req.user._id });
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNameplate = async (req, res) => {
    try {
        const data = {
            ...req.body,
            createdBy: req.user._id,
            tseId: req.user.tseId
        };
        const nameplate = await officerService.createNameplate(data);
        res.status(201).json(nameplate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};