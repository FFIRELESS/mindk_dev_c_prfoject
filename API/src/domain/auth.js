const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { getUserById, getUserByEmail } = require("./user");
const {
  create,
  getByToken,
  deleteByToken,
} = require("../services/store/session.service");
const { checkPassword } = require("./user");

const { appKey } = require("../services/config");

module.exports = {
  authorize: async (email, password) => {
    const user = await getUserByEmail(email);
    if (user) {
      if (checkPassword(password, user.password)) {
        const accessToken = jwt.sign(
          { user_id: user.User_ID, name: user.Fullname },
          appKey
        );
        const refreshToken = uuidv4();
        await create({
          User_ID: user.id,
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
        { user_id: user.User_ID, name: user.Fullname },
        appKey
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
    console.log("auth by id THERE");
    const user = await getUserById(id);
    if (user) {
      const accessToken = jwt.sign(
        { user_id: user.User_ID, name: user.Fullname },
        appKey
      );
      const refreshToken = uuidv4();
      await create({
        User_ID: user.User_ID,
        token: refreshToken,
      });
      console.log(accessToken); //********************************
      console.log(refreshToken); //********************************
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
