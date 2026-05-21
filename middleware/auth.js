const users = require('../config/users');
const speakeasy = require('speakeasy');

const verifiedUsers = [];

const verifyMfa = (userId, token) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  return speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token: token,
    window: 2,
  });
};

const requireAuth = (role) => (req, res, next) => {
  const userId = parseInt(req.headers['user-id']);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized! Please login first.' });
  }
  if (role === 'admin' && user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden! Admins only.' });
  }
  next();
};

module.exports = { requireAuth, verifyMfa };