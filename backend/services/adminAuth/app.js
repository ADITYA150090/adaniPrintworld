const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./db/db');
const adminRoutes = require('./routes/admin.routes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Admin Auth Service is running...');
});

module.exports = app;

