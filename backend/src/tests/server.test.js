require('./setup');
const request = require('supertest');
const app = require('../../server');

describe('Server', () => {
    describe('GET /api', () => {
        it('should return API running message', async () => {
            const response = await request(app)
                .get('/api');

            expect(response.status).toBe(200);
            expect(response.text).toContain('API is running');
        });
    });

    describe('CORS', () => {
        it('should have CORS enabled', async () => {
            const response = await request(app)
                .get('/api')
                .set('Origin', 'http://localhost:3000');

            expect(response.headers['access-control-allow-origin']).toBeDefined();
        });
    });
});

