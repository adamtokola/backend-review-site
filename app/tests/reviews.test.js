const request = require('supertest');
const app = require('../app'); // Adjusted path for app.js

describe('Reviews Routes', () => {
  it('should fetch reviews for an item', async () => {
    const res = await request(app).get('/api/items/1/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a review to an item', async () => {
    const res = await request(app)
      .post('/api/items/1/reviews')
      .send({
        rating: 5,
        reviewText: 'Great product!'
      })
      .set('Authorization', `Bearer your_token_here`); // Replace with a valid token
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
