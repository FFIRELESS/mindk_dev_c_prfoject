const Sessions = require("../models/sessions");

module.exports = {
  createSession: async (sessionData) => {
    const session = new Sessions(sessionData);

    await session.save().then(() => {
      return "Created successfully";
    });
  },
  getByToken: async (token) => {
    await Sessions.findOne({
      where: { token },
    }).then((data) => {
      if (data) {
        return data;
      }
    });
  },
  deleteByToken: async (token) => {
    await Sessions.destroy({
      where: { token },
    }).then((success) => {
      return !!success;
    });
  },
  deleteAllTokens: async (userId) => {
    await Sessions.destroy({
      where: { User_ID: userId },
    }).then((success) => {
      return !!success;
    });
  },
};
