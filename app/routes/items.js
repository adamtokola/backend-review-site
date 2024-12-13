const express = require('express');
const { Item, Review } = require('../models');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const items = await Item.findAll();
      if (!items.length) {
          return res.status(404).json({ error: 'No items found' });
      }
      return res.json(items);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
  }
});


// Get item details
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get reviews for an item
router.get('/:itemId/reviews', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { itemId: req.params.itemId } });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Post a review for an item
router.post('/:itemId/reviews', authenticateToken, async (req, res) => {
  try {
    const { text, score } = req.body;
    const review = await Review.create({
      text,
      score,
      userId: req.user.id,
      itemId: req.params.itemId,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
