const adminService = require("./admin.service");

exports.getAllHeads = async (req, res) => {
    try {
        const heads = await adminService.getAllHeads();
        res.json(heads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVerifiedLots = async (req, res) => {
    try {
        const lots = await adminService.getVerifiedLots();
        res.json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.downloadLot = async (req, res) => {
    try {
        await adminService.downloadLot(req.params.lotId, res);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
};