const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24,
    },
});

const BlacklistedToken = mongoose.model('HeadBlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;

