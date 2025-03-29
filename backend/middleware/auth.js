const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Set user in request
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

module.exports = { protect, generateToken };