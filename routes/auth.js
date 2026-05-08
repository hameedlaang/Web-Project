const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.send("<script>alert('User already exists!'); window.location.href='/signup.html';</script>");
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login.html');
    } catch (err) { res.status(500).send("Signup Error"); }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user._id, username: user.username };
            res.redirect('/education.html');
        } else {
            res.send("<script>alert('Invalid Credentials'); window.location.href='/login.html';</script>");
        }
    } catch (err) { res.status(500).send("Login Error"); }
});

module.exports = router;