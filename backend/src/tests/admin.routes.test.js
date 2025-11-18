require('./setup');
const request = require('supertest');
const app = require('../../server');
const { createTestAdmin, createTestHead, generateToken, getAuthHeader } = require('./helpers/testHelpers');

describe('Admin Routes', () => {
    describe('GET /admin/dashboard', () => {
        it('should get admin dashboard stats', async () => {
            const admin = await createTestAdmin();
            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/admin/dashboard')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Admin role', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });

            const response = await request(app)
                .get('/admin/dashboard')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/admin/dashboard');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /admin/heads', () => {
        it('should get all heads for admin', async () => {
            const admin = await createTestAdmin();
            await createTestHead({ email: 'head1@test.com' });
            await createTestHead({ email: 'head2@test.com' });

            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/admin/heads')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.heads).toBeDefined();
            expect(Array.isArray(response.body.heads)).toBe(true);
        });

        it('should return 403 for non-Admin role', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });

            const response = await request(app)
                .get('/admin/heads')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/admin/heads');

            expect(response.status).toBe(401);
        });
    });
});

