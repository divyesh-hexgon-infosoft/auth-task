module.exports = {
    roles: {
      ADMIN: 'admin',
      CUSTOMER: 'customer'
    },
    tokens: {
      ACCESS_TOKEN_EXPIRE: '24h',
      VERIFICATION_TOKEN_EXPIRE: '48h',
      RESET_PASSWORD_TOKEN_EXPIRE: '1h'
    },
    security: {
      SALT_ROUNDS: 10,
      MIN_PASSWORD_LENGTH: 8
    }
  };

