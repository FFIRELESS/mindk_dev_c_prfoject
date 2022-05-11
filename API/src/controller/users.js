const passwordHasher = require("../utils/passwordHasher");
const config = require("../services/config");

const Users = require("../models/user");
const University = require("../models/university");
const NotFoundException = require("../exceptions/NotFoundException");

module.exports = {
  createUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = passwordHasher(req.body.password, config.salt);
    }

    // TODO: req data checking needed

    const user = new Users(req.body);

    await user.save().then(() => {
      if (res) {
        res.send("Created successfully");
      } else {
        return 1;
      }
    });
  },
  getAllUsers: async (req, res) => {
    await Users.findAll({
      include: [
        {
          model: University,
          attributes: ["University_Title"],
        },
      ],
      order: ["Username"],
    }).then((data) => {
      res.send(data);
    });
  },
  getUserById: async (req, res) => {
    return await Users.findByPk(req.params.User_ID, {
      include: [
        {
          model: University,
          attributes: ["University_Title"],
        },
      ],
    }).then((data) => {
      if (data) {
        return res.send(data);
      }
      throw new NotFoundException("User not found");
    });
  },
  getUserByEmail: async (email) => {
    return await Users.findOne({
      where: { Email: email },
      include: [
        {
          model: University,
          attributes: ["University_Title"],
        },
      ],
    }).then((data) => {
      if (data) {
        return data;
      }
      return 0;
    });
  },
  getUserAvatar: async (req, res) => {
    await Users.findByPk(req.params.User_ID, {
      attributes: ["Image"],
    }).then((data) => {
      if (data === undefined) {
        throw new NotFoundException("Image getting error");
      }

      if (data === null) {
        res.sendFile("icon.png", { root: "uploads/avatars/default" });
      } else {
        res.sendFile(data.Image, { root: "uploads/avatars" });
      }
    });
  },

  // TODO: fix method below uploads avatar to the disk even when user doesn't exist

  setUserAvatar: async (req, res) => {
    if (!req.file) {
      return res.send("File error");
    }
    await Users.update(
      { Image: req.file.filename },
      {
        where: { User_ID: req.params.User_ID },
      }
    ).then((success) => {
      if (success[0]) {
        res.send("Avatar updating OK");
      } else {
        throw new NotFoundException("User does not exist");
      }
    });
  },
  updateUserById: async (req, res) => {
    await Users.update(req.body, {
      where: { User_ID: req.params.User_ID },
    }).then((success) => {
      if (success[0]) {
        res.send("User updating OK");
      } else {
        throw new NotFoundException("User does not exist");
      }
    });
  },
  deleteUserById: async (req, res) => {
    await Users.destroy({ where: { User_ID: req.params.User_ID } }).then(
      (success) => {
        if (success) {
          res.send("User deleting OK");
        } else {
          throw new NotFoundException("User does not exist");
        }
      }
    );
  },
  deleteUserAvatarById: async (req, res) => {
    await Users.update(
      { Image: "default/icon.png" },
      { where: { User_ID: req.params.User_ID } }
    ).then((success) => {
      if (success[0]) {
        res.send("User avatar deleting OK");
      } else {
        throw new NotFoundException("User does not exist");
      }
    });
  },
  checkPassword: (plainPassword, hash) =>
    hash === passwordHasher(plainPassword, config.salt),
};
