const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    isEmailVerified: Boolean!
    status: String!
    lastLogin: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String
    user: User
    message: String
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    email: String
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
  }

  type Query {
    me: User
    users(offset: Int, limit: Int): [User]!
    user(id: ID!): User
    dashboardStats: DashboardStats!
  }

  type DashboardStats {
    totalUsers: Int!
    activeUsers: Int!
    customerCount: Int!
    adminCount: Int!
  }

  type Mutation {
    # Auth Mutations
    registerCustomer(input: RegisterInput!): AuthPayload!
    registerAdmin(input: RegisterInput!): AuthPayload!
    adminLogin(input: LoginInput!): AuthPayload!
    verifyEmail(token: String!): AuthPayload!
    forgotPassword(email: String!): AuthPayload!
    resetPassword(token: String!, newPassword: String!): AuthPayload!
    
    # User Mutations
    updateProfile(input: UpdateProfileInput!): User!
    changePassword(input: ChangePasswordInput!): AuthPayload!
    deleteAccount: AuthPayload!
    
    # Admin Mutations
    updateUserStatus(userId: ID!, status: String!): User!
    deleteUser(userId: ID!): AuthPayload!
  }
`;