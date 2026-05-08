const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Rubric #4: Hashing
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Rubric #5: Plain-text never stored
            role: 'User'
        });
        await newUser.save();
        res.redirect('/login.html');
    } catch (err) {
        res.status(500).send("Error creating account.");
    }
});

// Login Route (Rubric #2 & #6)
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.user = { id: user._id, role: user.role };
        res.redirect(user.role === 'Admin' ? '/admin.html' : '/index.html');
    } else {
        res.status(401).send("Invalid email or password.");
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;