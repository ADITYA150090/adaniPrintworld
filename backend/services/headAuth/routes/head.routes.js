const express = require('express');
const { body, param } = require('express-validator');

const headController = require('../controllers/head.controller');
const { authHead } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('number').isLength({ min: 10 }).withMessage('Contact number must be at least 10 digits'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('address.pincode').notEmpty().withMessage('Pincode is required'),
        body('address.area').notEmpty().withMessage('Area is required'),
        body('address.district').notEmpty().withMessage('District is required'),
        body('address.city').notEmpty().withMessage('City is required'),
        body('address.plotNo').notEmpty().withMessage('Plot number is required'),
    ],
    headController.registerHead,
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').exists().withMessage('Password is required'),
    ],
    headController.loginHead,
);

router.get('/profile', authHead, headController.getHeadProfile);

router.get('/logout', authHead, headController.logoutHead);

router.patch(
    '/officers/:officerId/approve',
    [param('officerId').isMongoId().withMessage('Invalid officer id')],
    authHead,
    headController.approveOfficer,
);

module.exports = router;

