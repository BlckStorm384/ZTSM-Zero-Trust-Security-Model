const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const { ListRolesCommand } = require('@aws-sdk/client-iam');
const iamClient = require('../config/awsConfig');
const users = require('../config/users');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

// Fetch IAM roles from AWS
router.get('/roles', async (req, res) => {
  try {
    const command = new ListRolesCommand({});
    const response = await iamClient.send(command);
    const roles = response.Roles.map(role => ({
      name: role.RoleName,
      arn: role.Arn,
    }));
    res.json({ roles });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password!' });
  }
  const token = speakeasy.totp({
    secret: user.mfaSecret,
    encoding: 'base32',
  });
  console.log(`MFA code for ${user.email}: ${token}`);
  res.json({ message: 'Login successful! Check terminal for MFA code.', userId: user.id });
});

// Verify MFA
router.post('/verify-mfa', (req, res) => {
  const { userId, token } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found!' });
  }
  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token: token,
    window: 2,
  });
  if (!verified) {
    return res.status(401).json({ error: 'Invalid MFA code!' });
  }
  res.json({
    message: 'MFA verified! Access granted.',
    user: { email: user.email, role: user.role, iamRole: user.iamRole },
  });
});

module.exports = router;