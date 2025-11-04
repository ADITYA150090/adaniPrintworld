const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDB = require('./db/db');
const headRoutes = require('./routes/head.routes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/head', headRoutes);

app.get('/', (req, res) => {
    res.send('Head Auth Service is running...');
});

module.exports = app;

