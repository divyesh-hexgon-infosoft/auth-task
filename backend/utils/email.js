const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, token) => {
  // Configure your email transport here
  const transporter = nodemailer.createTransport({
    // Add your email service configuration
  });

  const verificationLink = `http://your-frontend-url/verify-email?token=${token}`;

  await transporter.sendMail({
    from: 'your-email@example.com',
    to: email,
    subject: 'Email Verification',
    html: `Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`
  });
};
