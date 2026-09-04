// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    req.user = { id: 'anonymous', role: 'guest' };
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smartcampus_secret_key_12345');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

authMiddleware.ensureTeacherOrAdmin = (req, res, next) => {
  return next();
};

authMiddleware.ensureAny = (req, res, next) => {
  return next();
};

module.exports = authMiddleware;
