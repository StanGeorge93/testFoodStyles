export default `
  type Query {
    dummy: String,
    user: User
  }
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }
  type Test {
    test: String!
  }
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type RegisterResponse {
    user: User
  }
  type LoginResponse {
    token: String
    refreshToken: String
  }
  type Mutation {
    register(registerInput: RegisterInput): RegisterResponse!
    login(loginInput: LoginInput): LoginResponse!
  }
`;