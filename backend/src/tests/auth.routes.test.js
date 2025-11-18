require('./setup');
const request = require('supertest');
const app = require('../../server');
const { Admin, Head, Officer } = require('../modules/auth/auth.model');
const { createTestAdmin, createTestHead, createTestOfficer, generateToken, getAuthHeader } = require('./helpers/testHelpers');
const bcrypt = require('bcryptjs');

describe('Auth Routes', () => {
    describe('POST /auth/signup/:type', () => {
        it('should register a new admin', async () => {
            const response = await request(app)
                .post('/auth/signup/Admin')
                .send({
                    name: 'New Admin',
                    email: 'newadmin@test.com',
                    password: 'Admin@123',
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toContain('registered successfully');
        });

        it('should register a new head', async () => {
            const response = await request(app)
                .post('/auth/signup/Head')
                .send({
                    name: 'New Head',
                    email: 'newhead@test.com',
                    number: '1234567890',
                    district: 'Pune',
                    pincode: '411001',
                    password: 'Head@123',
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
        });

        it('should register a new officer', async () => {
            const response = await request(app)
                .post('/auth/signup/Officer')
                .send({
                    name: 'New Officer',
                    email: 'newofficer@test.com',
                    number: '9876543210',
                    address: 'Test Address',
                    tseId: 'TSE001',
                    password: 'Officer@123',
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
        });

        it('should return 400 for invalid signup type', async () => {
            const response = await request(app)
                .post('/auth/signup/Invalid')
                .send({
                    name: 'Test',
                    email: 'test@test.com',
                    password: 'Test@123',
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 for duplicate email', async () => {
            const duplicateEmail = `duplicate-${Date.now()}@test.com`;
            const firstAdmin = await createTestAdmin({ email: duplicateEmail });
            
            // Verify first admin was created
            expect(firstAdmin).not.toBeNull();
            expect(firstAdmin.email).toBe(duplicateEmail);

            // Verify admin exists in database
            const existingAdmin = await Admin.findOne({ email: duplicateEmail });
            expect(existingAdmin).not.toBeNull();

            const response = await request(app)
                .post('/auth/signup/Admin')
                .send({
                    name: 'Duplicate Admin',
                    email: duplicateEmail,
                    password: 'Admin@123',
                });

            // Should return 400 for duplicate email
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /auth/login', () => {
        let admin;
        
        beforeEach(async () => {
            admin = await createTestAdmin();
        });

        it('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: admin.email,
                    password: 'Admin@123',
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.token).toBeDefined();
            expect(response.body.user).toBeDefined();
        });

        it('should return 400 for invalid email', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'wrong@test.com',
                    password: 'Admin@123',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for invalid password', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: admin.email,
                    password: 'WrongPassword',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return 400 for unverified email', async () => {
            await createTestAdmin({ email: 'unverified@test.com', isVerified: false });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'unverified@test.com',
                    password: 'Admin@123',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('PATCH /auth/verify-email', () => {
        it('should verify email with valid token', async () => {
            const crypto = require('crypto');
            const verifyToken = crypto.randomBytes(32).toString('hex');
            const admin = await createTestAdmin({
                email: `verify-${Date.now()}@test.com`,
                isVerified: false,
                verifyToken: verifyToken,
                verifyTokenExpiry: Date.now() + 30 * 60 * 1000, // 30 minutes in future
            });

            // Verify admin exists before verification
            const adminBefore = await Admin.findById(admin._id);
            expect(adminBefore).not.toBeNull();
            expect(adminBefore.isVerified).toBe(false);
            expect(adminBefore.verifyToken).toBe(verifyToken);


            const response = await request(app)
                .patch('/auth/verify-email')
                .query({ token: verifyToken });

            // Check response status and body
            if (response.status !== 200) {
                console.log('Verification error:', response.body);
                console.log('Token used:', verifyToken);
            }

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            // Refresh admin from database to verify it was updated
            const updatedAdmin = await Admin.findById(admin._id);
            expect(updatedAdmin).not.toBeNull();
            expect(updatedAdmin.isVerified).toBe(true);
            expect(updatedAdmin.verifyToken).toBeNull();
        });

        it('should return 400 for invalid token', async () => {
            const response = await request(app)
                .patch('/auth/verify-email')
                .query({ token: 'invalid-token' });

            expect(response.status).toBe(400);
        });

        it('should return 400 for missing token', async () => {
            const response = await request(app)
                .patch('/auth/verify-email');

            expect(response.status).toBe(400);
        });
    });

    describe('PATCH /auth/approve-officer/:officerId', () => {
        it('should approve officer by Head role', async () => {
            const head = await createTestHead();
            const officer = await createTestOfficer(head._id);

            // Verify officer exists before approval
            const officerBefore = await Officer.findById(officer._id);
            expect(officerBefore).not.toBeNull();

            const token = generateToken({ _id: head._id, email: head.email, role: 'Head', id: head._id });

            const response = await request(app)
                .patch(`/auth/approve-officer/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const updatedOfficer = await Officer.findById(officer._id);
            expect(updatedOfficer.approvedByHead).toBe(true);
            expect(updatedOfficer.isVerified).toBe(true);
        });

        it('should return 403 for non-Head role', async () => {
            const admin = await createTestAdmin();
            const officer = await createTestOfficer();

            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .patch(`/auth/approve-officer/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const officer = await createTestOfficer();

            const response = await request(app)
                .patch(`/auth/approve-officer/${officer._id}`);

            expect(response.status).toBe(401);
        });

        it('should return 404 for non-existent officer', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });
            const fakeId = '507f1f77bcf86cd799439011';

            const response = await request(app)
                .patch(`/auth/approve-officer/${fakeId}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(404);
        });
    });
});

