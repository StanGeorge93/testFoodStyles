import {TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "./config"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "./utils/validator";
import loggerFactory from "./utils/loggerFactory"

const logger = loggerFactory("Resolvers")(console.log)

const Root = {
  login: async ({loginInput: {email, password}}, {repository}) => {
    // Validate user data
    try {

      const {valid, errors} = validator.validateLoginInput({
        email,
        password,
      });


      if (!valid) {
        throw 'Invalid creditentials'
      }

      const user = await repository.getByEmail(email);

      if (!user) {
        throw 'User does not exist'
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw 'Invalid password';
      }

      // refresh every time we login
      const refreshTokenSecret = user.password + REFRESH_TOKEN_SECRET;

      const token = await jwt.sign(
        {
          id: user.id,
        },
        TOKEN_SECRET,
        {
          expiresIn: '1h',
        },
      );

      const refreshToken = await jwt.sign(
        {
          id: user.id
        },
        refreshTokenSecret,
        {
          expiresIn: '7d',
        },
      );

      const newUser = await repository.update(user, {
          token,
          refreshToken,
          refreshSecret: refreshTokenSecret
      });

      return {
        refreshToken,
        token
      };
    } catch (error) {
      throw new Error(error);
      const loginError = typeof error === "string" ? error : "Something went wrong";
      throw new Error(loginError)
    }
  },

  register: async ({registerInput: {name, email, password, confirmPassword}}, {repository}) => {
    // register: async (...args) => {
    // Validate user data

    try {
      const {valid, errors} = validator.validateRegisterInput({
        name,
        email,
        password,
        confirmPassword
      });


      if (!valid) {
        throw 'Invalid'
      }

      const alreadyExists = await repository.getByEmail(email);

      if (alreadyExists) {
        throw 'email already exists';
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await repository.create({
        email: email,
        name: name,
        password: hashedPassword
      });

      return {
        name,
        email
      };
    } catch (error) {
      const registerError = typeof error === "string" ? error : "Something went wrong";
      throw new Error(registerError)
    }

  },

  me: async ({ token }, {repository}) => {
    if (!token) {
      throw new Error("Invalid token")
    }

    const id = await jwt.verify(token, TOKEN_SECRET);

    const userInDb = await repository.getById(id);

    if (!userInDb) {
      return {
        ok: false
      }
    }

    return {
      ok: true,
      name: userInDb.name
    }
  },

  refreshAuthToken: async ({token}, {repository}) => {
    if (!token) {
      throw new Error("Invalid token")
    }

    const id = await jwt.verify(token, TOKEN_SECRET);

    const userInDb = await repository.getById(id);

    if (!userInDb) {
      throw new Error("User does not exist");
    }

    const newToken = await jwt.sign(
      {
        id: id,
      },
      TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );

    return {
      token
    }
  }
};

export default Root
