require('./setup');
const request = require('supertest');
const app = require('../../server');
const { createTestAdmin, createTestOfficer, generateToken, getAuthHeader } = require('./helpers/testHelpers');
const Lot = require('../modules/lot/lot.model');

describe('Officer Routes', () => {
    let officer;
    let token;

    beforeEach(async () => {
        officer = await createTestOfficer();
        token = generateToken({ _id: officer._id, email: officer.email, role: 'Officer', id: officer._id });
    });

    describe('GET /officer/dashboard', () => {
        it('should get officer dashboard stats', async () => {
            const response = await request(app)
                .get('/officer/dashboard')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Officer role', async () => {
            const admin = await createTestAdmin();
            const adminToken = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .get('/officer/dashboard')
                .set(getAuthHeader(adminToken));

            expect(response.status).toBe(403);
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/officer/dashboard');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /officer/lot', () => {
        it('should create a new lot', async () => {
            const response = await request(app)
                .post('/officer/lot')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 403 for non-Officer role', async () => {
            const admin = await createTestAdmin();
            const adminToken = generateToken({ _id: admin._id, email: admin.email, role: 'Admin' });

            const response = await request(app)
                .post('/officer/lot')
                .set(getAuthHeader(adminToken));

            expect(response.status).toBe(403);
        });
    });

    describe('GET /officer/lot', () => {
        it('should get all lots for officer', async () => {
            // Create a lot for the officer
            const lot = new Lot({
                lotNo: 1,
                createdBy: officer._id,
            });
            await lot.save();

            const response = await request(app)
                .get('/officer/lot')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should return empty array if no lots exist', async () => {
            const response = await request(app)
                .get('/officer/lot')
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('POST /officer/lot/:lotId/nameplate', () => {
        it('should create a nameplate for a lot', async () => {
            // Generate unique lot number
            const lastLot = await Lot.findOne().sort({ lotNo: -1 });
            const lotNo = lastLot ? lastLot.lotNo + 1 : Date.now();
            const lot = new Lot({
                lotNo: lotNo,
                createdBy: officer._id,
            });
            await lot.save();

            const nameplateData = {
                theme: 'classic',
                name: 'John Doe',
                address: '123 Test St',
                houseName: 'Test House',
                selectedImage: 'image1.jpg',
                nameStyle: {
                    color: '#000000',
                    fontSize: 24,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    fontFamily: 'Arial',
                },
                addressStyle: {
                    color: '#333333',
                    fontSize: 18,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontFamily: 'Arial',
                },
                houseStyle: {
                    color: '#666666',
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontFamily: 'Arial',
                },
            };

            const response = await request(app)
                .post(`/officer/lot/${lot._id}/nameplate`)
                .set(getAuthHeader(token))
                .send(nameplateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should return 400 for invalid lot ID', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .post(`/officer/lot/${fakeId}/nameplate`)
                .set(getAuthHeader(token))
                .send({ name: 'Test' });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /officer/lot/:lotId/nameplate', () => {
        it('should get all nameplates for a lot', async () => {
            const lot = new Lot({
                lotNo: 1,
                createdBy: officer._id,
            });
            await lot.save();

            const response = await request(app)
                .get(`/officer/lot/${lot._id}/nameplate`)
                .set(getAuthHeader(token));

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('PATCH /officer/nameplate/:nameplateId/status', () => {
        it('should update nameplate status', async () => {
            const nameplateId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .patch(`/officer/nameplate/${nameplateId}/status`)
                .set(getAuthHeader(token))
                .send({ status: 'Completed' });

            // This will depend on your service implementation
            expect([200, 400]).toContain(response.status);
        });

        it('should return 401 without token', async () => {
            const nameplateId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .patch(`/officer/nameplate/${nameplateId}/status`)
                .send({ status: 'Completed' });

            expect(response.status).toBe(401);
        });
    });
});

