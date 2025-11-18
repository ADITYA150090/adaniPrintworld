// Test helper functions
const jwt = require('jsonwebtoken');
const env = require('../../config/environment');
const { Admin, Head, Officer } = require('../../modules/auth/auth.model');
const bcrypt = require('bcryptjs');

/**
 * Generate JWT token for testing
 */
const generateToken = (user) => {
    return jwt.sign({
            id: user._id || user.id,
            email: user.email,
            role: user.role || user.type,
        },
        env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN }
    );
};

/**
 * Generate unique email for testing
 */
const generateUniqueEmail = (prefix) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}@test.com`;
};

/**
 * Create test admin user
 */
const createTestAdmin = async(overrides = {}) => {
    const adminData = {
        name: 'Test Admin',
        email: generateUniqueEmail('admin'),
        password: await bcrypt.hash('Admin@123', 10),
        isVerified: true,
        ...overrides,
    };
    const admin = new Admin(adminData);
    await admin.save();
    return admin;
};

/**
 * Create test head user
 */
const createTestHead = async(overrides = {}) => {
    const headData = {
        name: 'Test Head',
        email: generateUniqueEmail('head'),
        number: '1234567890',
        tseId: `TSE${Date.now()}${Math.floor(Math.random() * 1000)}`,
        district: 'Mumbai',
        pincode: '400001',
        password: await bcrypt.hash('Head@123', 10),
        isVerified: true,
        ...overrides,
    };
    const head = new Head(headData);
    await head.save();
    return head;
};

/**
 * Create test officer user
 */
const createTestOfficer = async(headId = null, overrides = {}) => {
    const officerData = {
        name: 'Test Officer',
        email: generateUniqueEmail('officer'),
        number: '9876543210',
        address: 'Test Address',
        tseId: `TSE${Date.now()}${Math.floor(Math.random() * 1000)}`,
        password: await bcrypt.hash('Officer@123', 10),
        isVerified: true,
        approvedByHead: false,
        headId: headId,
        ...overrides,
    };
    const officer = new Officer(officerData);
    await officer.save();
    return officer;
};

/**
 * Get auth header for requests
 */
const getAuthHeader = (token) => {
    return { Authorization: `Bearer ${token}` };
};

module.exports = {
    generateToken,
    createTestAdmin,
    createTestHead,
    createTestOfficer,
    getAuthHeader,
};