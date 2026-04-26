const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

// Step 1: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// Step 2: Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // check if all fields are provided
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Step 3: Login existing user
// POST /api/users/login -> login user with JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // payload
      process.env.JWT_SECRET || 'supersecretkey',   // secret key
      { expiresIn: '1h' }                           // token expiration
    );

    // send token to frontend along with username
    res.json({ message: `Welcome ${user.username}`, token, username: user.username });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
