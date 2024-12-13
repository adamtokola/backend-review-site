
const express = require('express');
const { Item, Review } = require('../models');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific item by ID
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.itemId, {
      include: [{ model: Review }]
    });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    const averageRating = item.Reviews.reduce((sum, review) => sum + review.rating, 0) / item.Reviews.length || 0;
    res.json({ ...item.toJSON(), averageRating });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
