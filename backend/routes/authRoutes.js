const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { validateToken } = require('../middleware/authMiddleware');
const { validatePassword } = require('../utils/validators');

// Validation middleware
const registerValidation = [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('email').trim().isEmail().withMessage('Please provide a valid email'),
  body('password').custom((value) => {
    const validation = validatePassword(value);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    return true;
  }),
  body('role').isIn(['admin', 'customer']).withMessage('Invalid role specified')
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Route handlers
router.post('/register/customer', registerValidation, AuthController.registerCustomer);
router.post('/register/admin', registerValidation, AuthController.registerAdmin);
router.post('/login/admin', loginValidation, AuthController.adminLogin);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/logout', validateToken, AuthController.logout);
router.get('/refresh-token', AuthController.refreshToken);

module.exports = router;