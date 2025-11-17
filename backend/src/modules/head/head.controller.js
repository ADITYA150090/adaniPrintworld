const service = require("./head.service");

exports.dashboard = async(req, res) => {
    try {
        const data = await service.getHeadStats(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.approveOfficer = async(req, res) => {
    try {
        const result = await service.approveOfficer(req.params.officerId, req.user.id);
        res.json({ success: true, message: result });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};