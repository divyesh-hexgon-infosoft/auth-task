const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const { tokens } = require('../config/constants');

// Create transporter
const transporter = nodemailer.createTransport(emailConfig.smtp);

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection established successfully');
  }
});

const emailTemplates = {
  verification: (token) => ({
    subject: 'Verify Your Email Address',
    html: `
      <h1>Welcome!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${emailConfig.baseUrl}/verify-email?token=${token}">
        Verify Email Address
      </a>
      <p>This link will expire in 48 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `
  }),
  
  resetPassword: (token) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to proceed:</p>
      <a href="${emailConfig.baseUrl}/reset-password?token=${token}">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  })
};

const sendEmail = async (to, template, token) => {
  const { subject, html } = emailTemplates[template](token);
  
  try {
    await transporter.sendMail({
      from: emailConfig.from,
      to,
      subject,
      html
    });
    console.log(`${template} email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(`Error sending ${template} email:`, error);
    throw error;
  }
};

module.exports = { sendEmail };
