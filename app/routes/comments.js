const express = require('express');
const { Comment, Review } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/:reviewId/comments', authMiddleware, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const comment = await Comment.create({
      text,
      reviewId,
      userId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const comment = await Comment.findOne({
      where: { id: commentId, userId: req.user.id },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.text = text;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
