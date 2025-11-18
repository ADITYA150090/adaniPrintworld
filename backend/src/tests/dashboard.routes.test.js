require('./setup');
const request = require('supertest');
const app = require('../../server');
const { createTestAdmin, createTestHead, createTestOfficer, generateToken, getAuthHeader } = require('./helpers/testHelpers');

describe('Dashboard Routes', () => {
    describe('GET /dashboard/admin', () => {
        it('should get admin dashboard stats', async () => {
            const admin = await createTestAdmin();
            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/dashboard/admin')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Admin role', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });

            const response = await request(app)
                .get('/dashboard/admin')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/dashboard/admin');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /dashboard/head', () => {
        it('should get head dashboard stats', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });

            const response = await request(app)
                .get('/dashboard/head')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Head role', async () => {
            const admin = await createTestAdmin();
            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/dashboard/head')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/dashboard/head');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /dashboard/officer', () => {
        it('should get officer dashboard info', async () => {
            const officer = await createTestOfficer();
            const token = generateToken({ _id: officer._id, email: officer.email, role: 'Officer', id: officer._id });

            const response = await request(app)
                .get('/dashboard/officer')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Officer role', async () => {
            const admin = await createTestAdmin();
            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/dashboard/officer')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/dashboard/officer');

            expect(response.status).toBe(401);
        });
    });
});

