const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { getUserById, getUserByEmail } = require("../services/user");
const {
  create,
  getByToken,
  deleteByToken,
} = require("./store/session.service");
const { checkPassword } = require("./user");

const { appKey } = require("./config");

module.exports = {
  authorize: async (email, password) => {
    const user = await getUserByEmail(email);
    if (user) {
      if (checkPassword(password, user.password)) {
        const accessToken = jwt.sign(
          { user_id: user.id, name: user.name },
          appKey
        );
        const refreshToken = uuidv4();
        await create({
          user_id: user.id,
          token: refreshToken,
        });
        return { accessToken, refreshToken };
      }
    }
    return {};
  },
  refresh: async (refreshToken) => {
    const session = await getByToken(refreshToken);
    if (session) {
      const user = await getUserById(session.user_id);
      const accessToken = jwt.sign(
        { user_id: user.id, name: user.name },
        appKey
      );
      const refreshToken = uuidv4();
      await deleteByToken(session.token);
      await create({
        user_id: session.user_id,
        token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  authorizeById: async (id) => {
    const user = await getUserById(id);
    if (user) {
      const accessToken = jwt.sign(
        { user_id: user.id, name: user.name },
        appKey
      );
      const refreshToken = uuidv4();
      await create({
        user_id: user.id,
        token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  logout: async (token) => {
    await deleteByToken(token);
  },
  getByToken: async (token) => {
    const session = await getByToken(token);

    return session;
  },
};