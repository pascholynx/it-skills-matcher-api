const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    console.log('No token provided'); // Debug log
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log('Token verified for user:', req.user.id); // Debug log
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Debug log
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 