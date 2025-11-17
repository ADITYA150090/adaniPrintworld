const service = require("./admin.service");

exports.dashboard = async(req, res) => {
    try {
        const data = await service.getAdminStats();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getAllHeads = async(req, res) => {
    try {
        const data = await service.getAllHeads();
        res.json({ success: true, heads: data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};