const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("../services/config");
const Users = require("../models/user");

const { createSession, getByToken, deleteByToken } = require("./sessions");
const { getUserByEmail, checkPassword } = require("./users");
const UnauthorizedException = require("../exceptions/UnauthorizedException");

module.exports = {
  authorize: async (req, res) => {
    const user = await getUserByEmail(req.body.Email);
    if (user) {
      if (checkPassword(req.body.Password, user.password)) {
        const accessToken = jwt.sign(
          { User_ID: user.User_ID, Username: user.Username },
          config.appKey
        );
        const refreshToken = uuidv4();
        await createSession({
          User_ID: user.User_ID,
          token: refreshToken,
        });
        if (accessToken) {
          return res.send({
            accessToken,
            refreshToken,
          });
        }
        throw UnauthorizedException;
      }
    }
    return {};
  },

  refresh: async (req, res) => {
    let { refreshToken } = req.cookies;

    const session = await getByToken(refreshToken);

    if (!session) {
      throw UnauthorizedException;
    }

    const user = (await Users.findByPk(session.User_ID)).dataValues;

    const accessToken = jwt.sign(
      { User_ID: user.User_ID, Username: user.Username },
      config.appKey
    );
    refreshToken = uuidv4();
    await deleteByToken(session.token);
    await createSession({
      User_ID: session.User_ID,
      token: refreshToken,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.send({ accessToken, refreshToken, user });
  },

  authorizeById: async (req, res) => {
    await Users.findByPk(req.user.User_ID).then((user) => {
      if (user) {
        const accessToken = jwt.sign(
          { User_ID: user.User_ID, Username: user.Username },
          config.appKey
        );
        const refreshToken = uuidv4();

        createSession({
          User_ID: user.User_ID,
          token: refreshToken,
        });

        if (accessToken) {
          res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.send({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user,
            success: true,
          });
        }
        throw UnauthorizedException;
      }
      return {};
    });
  },

  logout: async (req, res) => {
    await deleteByToken(req.cookies.refreshToken).then(() => {
      res.send({ success: true });
    });
  },
};
