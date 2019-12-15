export default `
  type Query {
    user: User
  }
  type User {
    id: ID!
    name: String!
    email: String!
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
    name: String,
    email: String
  }
  type LoginResponse {
    token: String
    refreshToken: String
  }
  type RefreshAuthTokenResponse {
    token: String
  }
  type MeResponse {
    ok: Boolean!,
    name: String
  }
  type Mutation {
    register(registerInput: RegisterInput): RegisterResponse!
    login(loginInput: LoginInput): LoginResponse!
    me(token: String): MeResponse!
    refreshAuthToken(token: String): RefreshAuthTokenResponse!
  }
`;