const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { tokens } = require('../config/constants');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: tokens.ACCESS_TOKEN_EXPIRE }
  );
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  generateVerificationToken,
  verifyToken
};
