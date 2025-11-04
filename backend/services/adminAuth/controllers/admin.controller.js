const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/admin.model');
const BlacklistedToken = require('../models/blacklistToken.model');
const headModel = require('../../headAuth/models/head.model');

module.exports.registerAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, number, password } = req.body;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await adminModel.create({
            name,
            email,
            number,
            password: hashedPassword,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Admin registration submitted. Await system approval.',
            admin: {
                _id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                number: newAdmin.number,
                status: newAdmin.status,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports.loginAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (admin.status !== 'approved') {
            return res.status(403).json({ message: 'Admin account pending approval' });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.cookie('token', token);

        res.status(200).json({
            message: 'Admin logged in successfully',
            token,
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                number: admin.number,
                status: admin.status,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports.getAdminProfile = async (req, res) => {
    try {
        res.status(200).json({ admin: req.admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.logoutAdmin = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader ? authHeader.split(' ')[1] : null);

        res.clearCookie('token');

        if (token) {
            await BlacklistedToken.create({ token });
        }

        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.getPendingHeads = async (req, res, next) => {
    try {
        const pendingHeads = await headModel.find({ status: 'pending' }).select('-password');
        res.status(200).json({ heads: pendingHeads });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports.approveHead = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { headId } = req.params;

        const head = await headModel.findById(headId);
        if (!head) {
            return res.status(404).json({ message: 'Head not found' });
        }

        if (head.status === 'approved') {
            return res.status(200).json({ message: 'Head already approved', head });
        }

        head.status = 'approved';
        head.approvedBy = req.admin._id;
        head.approvedAt = new Date();
        await head.save();

        res.status(200).json({
            message: 'Head approved successfully',
            head,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

