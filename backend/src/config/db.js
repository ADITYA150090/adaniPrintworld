const mongoose = require('mongoose');
const env = require('./environment');

async function connectDB() {
    await mongoose.connect(env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}

module.exports = connectDB;