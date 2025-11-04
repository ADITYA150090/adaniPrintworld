const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const headModel = require('../models/head.model');
const BlacklistedToken = require('../models/blacklistToken.model');
const officerModel = require('../../officerAuth/models/officer.model');

module.exports.registerHead = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, number, email, password, address } = req.body;

        const existingHead = await headModel.findOne({ email });
        if (existingHead) {
            return res.status(409).json({ message: 'Head with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newHead = await headModel.create({
            name,
            number,
            email,
            password: hashedPassword,
            address,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Head registration submitted. Await admin approval.',
            head: {
                _id: newHead._id,
                name: newHead.name,
                number: newHead.number,
                email: newHead.email,
                address: newHead.address,
                role: newHead.role,
                status: newHead.status,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports.loginHead = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const head = await headModel.findOne({ email }).select('+password');
        if (!head) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, head.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (head.status !== 'approved') {
            return res.status(403).json({ message: 'Head account pending admin approval' });
        }

        const token = jwt.sign({ id: head._id, email: head.email }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.cookie('token', token);

        res.status(200).json({
            message: 'Head logged in successfully',
            token,
            head: {
                _id: head._id,
                name: head.name,
                number: head.number,
                email: head.email,
                address: head.address,
                role: head.role,
                status: head.status,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports.getHeadProfile = async (req, res) => {
    try {
        res.status(200).json({ head: req.head });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.logoutHead = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader ? authHeader.split(' ')[1] : null);

        res.clearCookie('token');

        if (token) {
            await BlacklistedToken.create({ token });
        }

        res.status(200).json({ message: 'Head logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.approveOfficer = async (req, res, next) => {
    try {
        if (req.head.status !== 'approved') {
            return res.status(403).json({ message: 'Head account not approved' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { officerId } = req.params;

        const officer = await officerModel.findById(officerId);
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found' });
        }

        if (officer.status === 'approved') {
            return res.status(200).json({ message: 'Officer already approved', officer });
        }

        officer.status = 'approved';
        officer.approvedBy = req.head._id;
        officer.approvedAt = new Date();
        await officer.save();

        res.status(200).json({ message: 'Officer approved successfully', officer });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

