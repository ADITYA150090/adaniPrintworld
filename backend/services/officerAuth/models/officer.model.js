const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const officerSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        default: 'officer',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Head',
        default: null,
    },
    approvedAt: {
        type: Date,
        default: null,
    },
    department: {
        type: String,
        default: null,
    },
    socketId: {
        type: String,
        default: null,
    },
}, { timestamps: true });


// =============== Instance Methods ===============

// Generate JWT Token
officerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
};

// Compare Password
officerSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Hash Password (static method)
officerSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Optional pre-save hook (if you want auto-hashing on save)
// officerSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const officerModel = mongoose.model('Officer', officerSchema);
module.exports = officerModel;