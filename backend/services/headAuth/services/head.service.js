const headModel = require('../models/head.model');

module.exports.createHead = async ({ name, number, email, password, address }) => {
    if (!name || !number || !email || !password || !address) {
        throw new Error('All fields are required');
    }

    const existingHead = await headModel.findOne({ email });
    if (existingHead) {
        throw new Error('Head with this email already exists');
    }

    const head = await headModel.create({
        name,
        number,
        email,
        password,
        address,
    });

    return head;
};

