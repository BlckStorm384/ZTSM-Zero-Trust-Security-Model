const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// User dashboard - any logged in user can access
router.get('/user', requireAuth('user'), (req, res) => {
  const userId = parseInt(req.headers['user-id']);
  const users = require('../config/users');
  const user = users.find(u => u.id === userId);
  res.json({
    message: 'Welcome to User Dashboard!',
    access: 'user-level',
    iamRole: user.iamRole,
    email: user.email,
  });
});

// Admin dashboard - only admin can access
router.get('/admin', requireAuth('admin'), (req, res) => {
  const userId = parseInt(req.headers['user-id']);
  const users = require('../config/users');
  const user = users.find(u => u.id === userId);
  res.json({
    message: 'Welcome to Admin Dashboard!',
    access: 'admin-level',
    iamRole: user.iamRole,
    email: user.email,
  });
});

module.exports = router;