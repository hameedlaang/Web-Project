const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'hameed_portfolio_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Atlas Connected"))
    .catch(err => console.log("❌ DB Error:", err));

app.use('/auth', require('./routes/auth'));

// Stage 1: Submit Education
app.post('/submit-education', async (req, res) => {
    if (!req.session.user) return res.redirect('/login.html');
    try {
        const { education, skills } = req.body;
        await User.findByIdAndUpdate(req.session.user.id, { education, skills });
        res.redirect('/projects.html');
    } catch (err) { res.status(500).send("Update Error"); }
});

// Stage 2: Submit Projects
app.post('/submit-projects', async (req, res) => {
    if (!req.session.user) return res.redirect('/login.html');
    try {
        const { projectDescription } = req.body;
        await User.findByIdAndUpdate(req.session.user.id, { projectDescription });
        res.redirect('/success.html');
    } catch (err) { res.status(500).send("Update Error"); }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));