import jwt from "jsonwebtoken";


export const createTokens = async (user, secret, secretRefresh) => {
  const createToken = jwt.sign(
    {
      user: user.id,
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: user.id
    },
    secretRefresh,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

// call this on every operation where we need to refresh the token
export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};