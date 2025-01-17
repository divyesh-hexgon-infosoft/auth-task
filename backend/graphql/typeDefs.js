const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    isEmailVerified: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
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

  type Query {
    hello: String!
  }

  type Mutation {
    registerCustomer(input: RegisterInput!): User!
    registerAdmin(input: RegisterInput!): User!
    adminLogin(input: LoginInput!): AuthPayload!
    verifyEmail(token: String!): Boolean!
  }
`;

module.exports = typeDefs;