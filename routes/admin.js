const express = require('express');
const router = express.Router();

// Middleware to protect admin routes 
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'Admin') {
        next();
    } else {
        res.status(403).send("<h1>403 Forbidden</h1><p>Admin access only.</p>"); // 
    }
};

router.get('/dashboard', isAdmin, (req, res) => {
    res.send("<h1>Admin Dashboard</h1><p>Welcome, Admin. You can manage users here.</p>"); // 
});

module.exports = router;