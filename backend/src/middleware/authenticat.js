const jwtProvider = require('../config/jwtProvider');
const userService = require('../services/user.service');
const passport = require('passport');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Token not provided' });
    }

    const userId = jwtProvider.getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }

    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const authenticateGoogle = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

const handleGoogleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' })(req, res, (err) => {
      if (err) {
          console.error('Error in handleGoogleCallback:', err);
          return res.status(500).json({ error: 'Authentication Failed' });
      }
      res.redirect('/dashboard'); 
  });
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden', message: 'Access denied' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = { authenticate, authenticateGoogle, handleGoogleCallback, isAdmin };
