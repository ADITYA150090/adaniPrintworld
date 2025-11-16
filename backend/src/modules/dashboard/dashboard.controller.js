const service = require("./dashboard.service");

exports.adminDashboard = async(req, res) => {
    try {
        const data = await service.getAdminStats();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.headDashboard = async(req, res) => {
    try {
        const data = await service.getHeadStats(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.officerDashboard = async(req, res) => {
    try {
        const data = await service.getOfficerInfo(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};