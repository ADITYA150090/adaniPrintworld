const officerModel = require('../models/officer.model');

module.exports.createOfficer = async({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    // Check if officer already exists
    const existingOfficer = await officerModel.findOne({ email });
    if (existingOfficer) {
        throw new Error('Officer with this email already exists');
    }

    // Create and save officer
    const officer = await officerModel.create({
        name: {
            firstname,
            lastname,
        },
        email,
        password,
    });

    return officer;
};