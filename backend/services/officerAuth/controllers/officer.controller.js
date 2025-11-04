const officerModel = require('../models/officer.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');

// ==========================
// Register Officer
// ==========================
module.exports.registerOfficer = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if officer already exists
        const existingOfficer = await officerModel.findOne({ email });
        if (existingOfficer) {
            return res.status(409).json({ message: 'Officer with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create officer
        const newOfficer = await officerModel.create({
            name,
            email,
            password: hashedPassword,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Officer registration submitted. Await head approval.',
            officer: {
                _id: newOfficer._id,
                name: newOfficer.name,
                email: newOfficer.email,
                role: newOfficer.role,
                status: newOfficer.status,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// ==========================
// Login Officer
// ==========================
module.exports.loginOfficer = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const officer = await officerModel.findOne({ email }).select('+password');
        if (!officer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, officer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (officer.status !== 'approved') {
            return res.status(403).json({ message: 'Officer account pending head approval' });
        }

        const token = jwt.sign({ id: officer._id, email: officer.email },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.cookie('token', token);

        res.status(200).json({
            message: 'Officer logged in successfully',
            token,
            officer: {
                _id: officer._id,
                name: officer.name,
                email: officer.email,
                role: officer.role,
                status: officer.status,
            },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// ==========================
// Get Officer Profile
// ==========================
module.exports.getOfficerProfile = async(req, res) => {
    try {
        res.status(200).json({
            officer: req.officer,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ==========================
// Logout Officer
// ==========================
module.exports.logoutOfficer = async(req, res) => {
    try {
        res.clearCookie('token');
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader ? authHeader.split(' ')[1] : null);

        if (token) {
            await blackListTokenModel.create({ token });
        }

        res.status(200).json({
            message: 'Officer logged out successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};