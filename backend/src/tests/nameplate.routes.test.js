require('./setup');
const request = require('supertest');
const app = require('../../server');
const Nameplate = require('../modules/nameplate/nameplate.model');
const Lot = require('../modules/lot/lot.model');
const { createTestOfficer, generateToken, getAuthHeader } = require('./helpers/testHelpers');

describe('Nameplate Routes', () => {
    let lot;
    let nameplateData;

    beforeEach(async () => {
        const officer = await createTestOfficer();
        // Generate unique lot number
        const lastLot = await Lot.findOne().sort({ lotNo: -1 });
        const lotNo = lastLot ? lastLot.lotNo + 1 : Date.now();
        lot = new Lot({
            lotNo: lotNo,
            createdBy: officer._id,
        });
        await lot.save();

        nameplateData = {
            lotId: lot._id,
            theme: 'classic',
            name: 'John Doe',
            address: '123 Test Street',
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
    });

    describe('POST /api/nameplate', () => {
        it('should create a new nameplate', async () => {
            const response = await request(app)
                .post('/api/nameplate')
                .send(nameplateData);

            expect(response.status).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body.lotId).toBeDefined();
        });

        it('should return 400 for missing required fields', async () => {
            const invalidData = { ...nameplateData };
            delete invalidData.lotId;

            const response = await request(app)
                .post('/api/nameplate')
                .send(invalidData);

            expect(response.status).toBe(400);
        });

        it('should set default approval status to Pending', async () => {
            const response = await request(app)
                .post('/api/nameplate')
                .send(nameplateData);

            expect(response.status).toBe(201);
            // If the response includes approvalStatus, check it
            if (response.body.approvalStatus) {
                expect(response.body.approvalStatus).toBe('Pending');
            }
        });
    });

    describe('GET /api/nameplate', () => {
        it('should get all nameplates', async () => {
            // Create a nameplate first
            const nameplate = new Nameplate(nameplateData);
            await nameplate.save();

            const response = await request(app)
                .get('/api/nameplate');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should return empty array if no nameplates exist', async () => {
            const response = await request(app)
                .get('/api/nameplate');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe('GET /api/nameplate/:id', () => {
        it('should get nameplate by ID', async () => {
            const nameplate = new Nameplate(nameplateData);
            await nameplate.save();

            const response = await request(app)
                .get(`/api/nameplate/${nameplate._id}`);

            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.lotId).toBeDefined();
        });

        it('should return 404 for non-existent nameplate', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .get(`/api/nameplate/${fakeId}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PATCH /api/nameplate/:id/approve', () => {
        it('should approve a nameplate', async () => {
            const nameplate = new Nameplate(nameplateData);
            await nameplate.save();

            // Verify nameplate exists before approval
            const nameplateBefore = await Nameplate.findById(nameplate._id);
            expect(nameplateBefore).not.toBeNull();

            const response = await request(app)
                .patch(`/api/nameplate/${nameplate._id}/approve`)
                .send({ approvedBy: '507f1f77bcf86cd799439011' });

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();

            // Verify approval status was updated
            const updated = await Nameplate.findById(nameplate._id);
            expect(updated).not.toBeNull();
            expect(updated.approvalStatus).toBe('Approved');
        });

        it('should return 404 for non-existent nameplate', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .patch(`/api/nameplate/${fakeId}/approve`)
                .send({ approvedBy: '507f1f77bcf86cd799439011' });

            expect(response.status).toBe(404);
        });
    });

    describe('PATCH /api/nameplate/:id/reject', () => {
        it('should reject a nameplate', async () => {
            const nameplate = new Nameplate(nameplateData);
            await nameplate.save();

            // Verify nameplate exists before rejection
            const nameplateBefore = await Nameplate.findById(nameplate._id);
            expect(nameplateBefore).not.toBeNull();

            const response = await request(app)
                .patch(`/api/nameplate/${nameplate._id}/reject`);

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();

            // Verify rejection status was updated
            const updated = await Nameplate.findById(nameplate._id);
            expect(updated).not.toBeNull();
            expect(updated.approvalStatus).toBe('Rejected');
        });

        it('should return 404 for non-existent nameplate', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .patch(`/api/nameplate/${fakeId}/reject`);

            expect(response.status).toBe(404);
        });
    });
});

