const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const officerRoutes = require('./routes/officer.routes');
const connectDB = require('./db/db'); // ✅ DB Connection

dotenv.config();

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/api/officer', officerRoutes);

app.get('/', (req, res) => {
    res.send('Officer Auth Service is running...');
});

module.exports = app;