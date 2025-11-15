// controllers/certificate.controller.js
const Nameplate = require("../models/nameplate.model");

exports.createNameplate = async(req, res) => {
    try {
        const newData = await Nameplate.create(req.body);
        res.status(201).json({
            success: true,
            message: "Nameplate saved",
            data: newData,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};