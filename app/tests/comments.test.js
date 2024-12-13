const request = require('supertest');
const app = require('../app'); // Adjusted path for app.js

describe('Comments Routes', () => {
  it('should add a comment to a review', async () => {
    const res = await request(app)
      .post('/api/items/1/reviews/1/comments')
      .send({
        commentText: 'I agree with this review!'
      })
      .set('Authorization', `Bearer your_token_here`); // Replace with a valid token
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch user comments', async () => {
    const res = await request(app)
      .get('/api/comments/me')
      .set('Authorization', `Bearer your_token_here`); // Replace with a valid token
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
