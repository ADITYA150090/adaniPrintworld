// Test setup and teardown
process.env.NODE_ENV = 'test'; // Set test environment before importing server

const mongoose = require('mongoose');
const env = require('../config/environment');

// Connect to test database before all tests
beforeAll(async() => {
    const mongoUri = process.env.MONGO_URI_TEST || env.MONGO_URI.replace('myapp', 'test_db');
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clean up database after each test
afterEach(async() => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Disconnect from database after all tests
afterAll(async() => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
        await mongoose.connection.close();
    } catch (error) {
        // Ignore errors during cleanup
    }
});