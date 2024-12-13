const express = require('express');
const { Review } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/:itemId/reviews', async (req, res) => {
  const { itemId } = req.params;
  try {
    const reviews = await Review.findAll({ where: { itemId } });
    res.json(reviews);
  } catch (error) {
    console.error('Fetch reviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:itemId/reviews', authMiddleware, async (req, res) => {
  const { itemId } = req.params;
  const { text, rating } = req.body;
  try {
    const review = await Review.create({ text, rating, itemId, userId: req.user.id });
    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { userId: req.user.id } });
    res.json(reviews);
  } catch (error) {
    console.error('Fetch user reviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
