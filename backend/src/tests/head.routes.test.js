require('./setup');
const request = require('supertest');
const app = require('../../server');
const { createTestAdmin, createTestHead, createTestOfficer, generateToken, getAuthHeader } = require('./helpers/testHelpers');
const { Officer } = require('../modules/auth/auth.model');

describe('Head Routes', () => {
    describe('GET /head/dashboard', () => {
        it('should get head dashboard stats', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head' });

            const response = await request(app)
                .get('/head/dashboard')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Head role', async () => {
            const admin = await createTestAdmin();
            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/head/dashboard')
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/head/dashboard');

            expect(response.status).toBe(401);
        });
    });

    describe('PATCH /head/approve/:officerId', () => {
        it('should approve officer by Head', async () => {
            const head = await createTestHead();
            const officer = await createTestOfficer(head._id);

            // Verify officer has correct headId
            const officerBefore = await Officer.findById(officer._id);
            expect(officerBefore.headId.toString()).toBe(head._id.toString());

            const token = generateToken({ _id: head._id, email: head.email, role: 'Head', id: head._id });

            const response = await request(app)
                .patch(`/head/approve/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const updatedOfficer = await Officer.findById(officer._id);
            expect(updatedOfficer.approvedByHead).toBe(true);
        });

        it('should return 404 for officer not belonging to head', async () => {
            const head1 = await createTestHead({ email: 'head1@test.com' });
            const head2 = await createTestHead({ email: 'head2@test.com' });
            const officer = await createTestOfficer(head1._id);

            const token = generateToken({ _id: head2._id, email: head2.email, role: 'Head', id: head2._id });

            const response = await request(app)
                .patch(`/head/approve/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(404);
        });

        it('should return 403 for non-Head role', async () => {
            const admin = await createTestAdmin();
            const officer = await createTestOfficer();

            const token = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .patch(`/head/approve/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(403);
        });
    });

    describe('PATCH /head/reject/:officerId', () => {
        it('should reject officer by Head', async () => {
            const head = await createTestHead();
            const officer = await createTestOfficer(head._id, { approvedByHead: true });

            // Verify officer has correct headId
            const officerBefore = await Officer.findById(officer._id);
            expect(officerBefore.headId.toString()).toBe(head._id.toString());

            const token = generateToken({ _id: head._id, email: head.email, role: 'Head', id: head._id });

            const response = await request(app)
                .patch(`/head/reject/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);

            const updatedOfficer = await Officer.findById(officer._id);
            expect(updatedOfficer.approvedByHead).toBe(false);
            expect(updatedOfficer.isVerified).toBe(false);
        });

        it('should return 404 for officer not belonging to head', async () => {
            const head1 = await createTestHead({ email: 'head1@test.com' });
            const head2 = await createTestHead({ email: 'head2@test.com' });
            const officer = await createTestOfficer(head1._id);

            const token = generateToken({ _id: head2._id, email: head2.email, role: 'Head', id: head2._id });

            const response = await request(app)
                .patch(`/head/reject/${officer._id}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(404);
        });

        it('should return 404 for non-existent officer', async () => {
            const head = await createTestHead();
            const token = generateToken({ _id: head._id, email: head.email, role: 'Head', id: head._id });
            const fakeId = '507f1f77bcf86cd799439011';

            const response = await request(app)
                .patch(`/head/reject/${fakeId}`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(404);
        });
    });
});

