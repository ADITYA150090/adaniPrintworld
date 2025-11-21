const lotService = require("./lot.service");

exports.createLot = async (req, res) => {
    try {
        const lot = await lotService.createLot(req.body);
        res.status(201).json(lot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getLots = async (req, res) => {
    try {
        const filter = {};
        if (req.query.officerId) filter.officerId = req.query.officerId;
        if (req.query.tseId) filter.tseId = req.query.tseId;
        if (req.query.headId) filter.headId = req.query.headId;

        const lots = await lotService.getLots(filter);
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLotById = async (req, res) => {
    try {
        const lot = await lotService.getLotById(req.params.id);
        if (!lot) return res.status(404).json({ error: "Lot not found" });
        res.json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLot = async (req, res) => {
    try {
        const lot = await lotService.updateLot(req.params.id, req.body);
        res.json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLot = async (req, res) => {
    try {
        await lotService.deleteLot(req.params.id);
        res.json({ message: "Lot deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
