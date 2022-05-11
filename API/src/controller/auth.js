const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { getUserByEmail, checkPassword } = require("./users");
const {
  create,
  getByToken,
  deleteByToken,
} = require("../services/store/session.service");

const config = require("../services/config");
const { getUserById } = require("../services/store/users.service");
const Users = require("../models/user");
const { createSession } = require("./sessions");
const UnauthorizedException = require("../exceptions/UnauthorizedException");

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

  // TODO: rewrite methods above same as all at routes/controllers

  authorizeById: async (req, res) => {
    await Users.findByPk(req.user.User_ID).then((user) => {
      if (user) {
        const accessToken = jwt.sign(
          { User_ID: user.User_ID, Fullname: user.Fullname },
          config.appKey
        );
        const refreshToken = uuidv4();

        createSession({
          User_ID: user.User_ID,
          token: refreshToken,
        });

        if (accessToken) {
          return res.send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            success: true,
          });
        }
        throw UnauthorizedException;
      }
      return {};
    });
  },
  logout: async (req, res) => {
    await deleteByToken(req.body.refreshToken).then(() => {
      res.send({ success: true });
    });
  },
};
