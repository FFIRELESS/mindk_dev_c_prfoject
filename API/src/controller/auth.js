const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { getUserByEmail, checkPassword } = require("./user");
const {
  create,
  getByToken,
  deleteByToken,
} = require("../services/store/session.service");

const config = require("../services/config");
const { getUserById } = require("../services/store/users.service");

module.exports = {
  authorize: async (email, password) => {
    const user = await getUserByEmail(email);
    if (user) {
      if (checkPassword(password, user.password)) {
        const accessToken = jwt.sign(
          { User_ID: user.User_ID, Fullname: user.Fullname },
          config.appKey
        );
        const refreshToken = uuidv4();
        await create({
          User_ID: user.User_ID,
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
      const user = await getUserById(session.User_ID);
      const accessToken = jwt.sign(
        { User_ID: user.User_ID, Fullname: user.Fullname },
        config.appKey
      );
      const refreshToken = uuidv4();
      await deleteByToken(session.token);
      await create({
        User_ID: session.User_ID,
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
        { User_ID: user.User_ID, Fullname: user.Fullname },
        config.appKey
      );
      const refreshToken = uuidv4();
      await create({
        User_ID: user.User_ID,
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
