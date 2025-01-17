const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  },
  Mutation: {
    async registerCustomer(_, { input }) {
      const verificationToken = generateToken();
      
      const user = await User.create({
        ...input,
        role: 'customer',
        verificationToken
      });

      await sendVerificationEmail(user.email, verificationToken);
      
      return user;
    },

    async registerAdmin(_, { input }) {
      const verificationToken = generateToken();
      
      const user = await User.create({
        ...input,
        role: 'admin',
        verificationToken
      });

      await sendVerificationEmail(user.email, verificationToken);
      
      return user;
    },

    async adminLogin(_, { input }) {
      const { email, password } = input;
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      if (user.role !== 'admin') {
        throw new Error('You are not allowed to login from here');
      }

      if (!user.isEmailVerified) {
        throw new Error('Please verify your email first');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        'your_jwt_secret',
        { expiresIn: '1d' }
      );

      return {
        token,
        user
      };
    },

    async verifyEmail(_, { token }) {
      const user = await User.findOne({ where: { verificationToken: token } });
      if (!user) {
        throw new Error('Invalid verification token');
      }

      user.isEmailVerified = true;
      user.verificationToken = null;
      await user.save();

      return true;
    }
  }
};

module.exports = resolvers;