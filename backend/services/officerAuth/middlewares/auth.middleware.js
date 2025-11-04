const officerModel = require('../models/officer.model');
const BlacklistedToken = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

// ============================
// 🧑 User Auth
// ============================
module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
};

// ============================
// 🚗 Captain Auth
// ============================
module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
};

// ============================
// 🧑‍✈️ Officer Auth
// ============================
module.exports.authOfficer = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader ? authHeader.split(' ')[1] : null);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const officer = await officerModel.findById(decoded._id || decoded.id).select('-password');

        if (!officer || officer.status !== 'approved') {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        req.officer = officer;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
};