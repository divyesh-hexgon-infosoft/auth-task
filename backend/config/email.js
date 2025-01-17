require('dotenv').config();

module.exports = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  from: process.env.SMTP_FROM || 'noreply@gmail.com',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
};

