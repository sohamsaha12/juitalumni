const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, rootMiddleware } = require('../middleware/authMiddleware');

// Approve a user
router.post('/:id/approve', authMiddleware, rootMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.pending = false;
    await user.save();
    res.status(200).json({ message: 'User approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user (decline registration request)
router.delete('/:id', authMiddleware, rootMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User registration request declined' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pending users
router.get('/pending', authMiddleware, rootMiddleware, async (req, res) => {
  try {
    const pendingUsers = await User.find({ pending: true });
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;