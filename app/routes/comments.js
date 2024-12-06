const express = require('express');
const { Comment } = require('../models');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Add a comment to a review
router.post('/items/:itemId/reviews/:reviewId/comments', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.create({
      text,
      userId: req.user.id,
      reviewId: req.params.reviewId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get current user's comments
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { userId: req.user.id } });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a comment
router.put('/users/:userId/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, userId: req.params.userId },
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    comment.text = text;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a comment
router.delete('/users/:userId/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, userId: req.params.userId },
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    await comment.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
