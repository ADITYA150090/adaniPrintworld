const express = require('express');
const { body, param } = require('express-validator');

const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('number').isLength({ min: 10 }).withMessage('Contact number must be at least 10 digits'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    adminController.registerAdmin,
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').exists().withMessage('Password is required'),
    ],
    adminController.loginAdmin,
);

router.get('/profile', authAdmin, adminController.getAdminProfile);

router.get('/logout', authAdmin, adminController.logoutAdmin);

router.get('/heads/pending', authAdmin, adminController.getPendingHeads);

router.patch(
    '/heads/:headId/approve',
    [param('headId').isMongoId().withMessage('Invalid head id')],
    authAdmin,
    adminController.approveHead,
);

module.exports = router;

