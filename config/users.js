const speakeasy = require('speakeasy');

const users = [
  {
    id: 1,
    email: 'admin@ztsm.com',
    password: 'Admin@1234',
    role: 'admin',
    iamRole: 'ztsm-admin-role',
    mfaSecret: speakeasy.generateSecret({ name: 'ZTSM Admin' }).base32,
  },
  {
    id: 2,
    email: 'user@ztsm.com',
    password: 'User@1234',
    role: 'user',
    iamRole: 'ztsm-user-role',
    mfaSecret: speakeasy.generateSecret({ name: 'ZTSM User' }).base32,
  },
];

module.exports = users;