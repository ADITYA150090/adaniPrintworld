const adminModel = require('../models/admin.model');

module.exports.createAdmin = async ({ name, email, number, password }) => {
    if (!name || !email || !number || !password) {
        throw new Error('All fields are required');
    }

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        throw new Error('Admin with this email already exists');
    }

    const admin = await adminModel.create({
        name,
        email,
        number,
        password,
        status: 'pending',
    });

    return admin;
};

