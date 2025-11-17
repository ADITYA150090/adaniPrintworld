const service = require("./officer.service");

exports.dashboard = async(req, res) => {
    try {
        const data = await service.getOfficerInfo(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};