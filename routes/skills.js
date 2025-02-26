const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user's skills
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user.selectedSkills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user's skills
router.post('/', auth, async (req, res) => {
  try {
    const { skills } = req.body;
    
    const user = await User.findById(req.user.id);
    user.selectedSkills = skills;
    user.hasSelectedSkills = true;
    await user.save();

    res.json(user.selectedSkills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 