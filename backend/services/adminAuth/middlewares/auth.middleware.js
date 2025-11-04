const jwt = require('jsonwebtoken');

const adminModel = require('../models/admin.model');
const BlacklistedToken = require('../models/blacklistToken.model');

module.exports.authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader ? authHeader.split(' ')[1] : null);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const isBlacklisted = await BlacklistedToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded._id || decoded.id).select('-password');

        if (!admin || admin.status !== 'approved') {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
};

