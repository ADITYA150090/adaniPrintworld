const express = require('express');
const { body } = require('express-validator');
const officerController = require('../controllers/officer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// 🚀 Officer Register
router.post(
    '/register', [
        body('name.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
        body('name.lastname')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
        body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
        body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    ],
    officerController.registerOfficer
);

// 🔐 Officer Login
router.post(
    '/login', [
        body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
        body('password')
        .exists()
        .withMessage('Password is required'),
    ],
    officerController.loginOfficer
);

// 🧑‍💼 Officer Profile
router.get('/profile',
    authMiddleware.authOfficer,
    officerController.getOfficerProfile
);

// 🚪 Officer Logout
router.get('/logout',
    authMiddleware.authOfficer,
    officerController.logoutOfficer
);

module.exports = router;