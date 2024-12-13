const request = require('supertest');
const app = require('../app'); // Adjusted path for app.js

describe('Items Routes', () => {
  it('should return a list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 404 for a non-existing item', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.statusCode).toBe(404);
  });
});
