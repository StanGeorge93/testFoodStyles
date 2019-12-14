import { SECRET, SECRET_REFRESH } from "./config"
import bcrypt from "bcryptjs";
import validator from "./validator";
import { UserInputError } from 'apollo-server';
import { createTokens } from "./jwtUtils";


const Mutation = {
  async login(parent, {loginInput :{ email, password  }}, { db }) {
    // Validate user data

    console.log("INSIDE REGISTEEER",email, password);

    const { valid, errors } = validator.validateLoginInput({
      email,
      password,
    });


    if (!valid) {
      throw new UserInputError('Errors', { errors })
    }

    const user = await db.User.findOne({ email });

    console.log("FOUND USER", user);

    if (!user) {
      throw new UserInputError('User does not exist', {
        errors: {
          user: 'User does not exist'
        }
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UserInputError('Invalid password', {
        errors: {
          password: 'Invalid password'
        }
      });
    }

    // refresh every time we login
    const refreshTokenSecret = user.password + SECRET_REFRESH;

    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    // tokenList[refreshToken] = {
    //   "status": "Logged in",
    //   "token": token,
    //   "refreshToken": refreshToken;
    // }

    console.log("TOKENUS", token);
    console.log("REFRESH TOKEN", refreshToken);

    return {
      refreshToken,
      token
    };
  },

  async register(parent, {registerInput :{ name, email, password, confirmPassword }}, { db }) {
    // Validate user data

    console.log("INSIDE REGISTEEER", name, email, password, confirmPassword);

    const { valid, errors } = validator.validateRegisterInput({
      name,
      email,
      password,
      confirmPassword
    });


    if (!valid) {
      throw new UserInputError('Errors', { errors })
    }

    const alreadyExists = await db.User.findOne({ email });

    if (alreadyExists) {
      throw new UserInputError('email already exists', {
        errors: {
          name: 'This email is taken'
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.User.create({
      email: email,
      name: name,
      password: hashedPassword
    });

    console.log("USER", user);

    return {
      user
    };
  }
};

export default {
  Mutation
}
