const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addressSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    area: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    plotNo: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });

const headSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        trim: true,
    },
    number: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    address: {
        type: addressSchema,
        required: true,
    },
    role: {
        type: String,
        default: 'head',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        default: null,
    },
    approvedAt: {
        type: Date,
        default: null,
    },
    socketId: {
        type: String,
        default: null,
    },
}, { timestamps: true });

headSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
};

headSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

headSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const headModel = mongoose.model('Head', headSchema);

module.exports = headModel;

