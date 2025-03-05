const request = require('supertest');
const app = require('../app'); // Separate express app from server

describe('Health Check API', () => {
  it('should return 200 for health check', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
