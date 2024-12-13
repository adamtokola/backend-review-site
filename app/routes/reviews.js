const express = require('express');
const { Review } = require('../models');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { userId: req.user.id } });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/users/:userId/reviews/:reviewId', authenticateToken, async (req, res) => {
  try {
    const { text, score } = req.body;
    const review = await Review.findOne({
      where: { id: req.params.reviewId, userId: req.params.userId },
    });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    review.text = text;
    review.score = score;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/users/:userId/reviews/:reviewId', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { id: req.params.reviewId, userId: req.params.userId },
    });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
