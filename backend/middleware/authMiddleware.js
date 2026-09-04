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
    res.status(401).json({ message: 'Invalid or expired authorization token' });
  }
};

// Ensure authenticated user
authMiddleware.ensureAuth = (req, res, next) => {
  if (!req.user || req.user.role === 'guest') {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

// Ensure Admin / Principal role
authMiddleware.ensureAdmin = (req, res, next) => {
  const role = (req.user?.role || '').toLowerCase();
  if (role !== 'admin' && role !== 'principal') {
    return res.status(403).json({ message: 'Access denied: Principal or Admin privileges required' });
  }
  next();
};

// Ensure Teacher / Faculty or Admin role
authMiddleware.ensureTeacherOrAdmin = (req, res, next) => {
  const role = (req.user?.role || '').toLowerCase();
  if (!['admin', 'principal', 'teacher', 'staff', 'faculty'].includes(role)) {
    return res.status(403).json({ message: 'Access denied: Staff or Admin privileges required' });
  }
  next();
};

// Ensure Staff role
authMiddleware.ensureStaff = (req, res, next) => {
  const role = (req.user?.role || '').toLowerCase();
  if (!['staff', 'teacher', 'faculty', 'admin', 'principal'].includes(role)) {
    return res.status(403).json({ message: 'Access denied: Staff privileges required' });
  }
  next();
};

// Allow any authenticated user
authMiddleware.ensureAny = (req, res, next) => {
  next();
};

module.exports = authMiddleware;
