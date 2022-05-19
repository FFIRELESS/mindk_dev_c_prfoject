const UserFriends = require("../models/userFriends");
const User = require("../models/user");
const University = require("../models/university");
const NotFoundException = require("../exceptions/NotFoundException");

module.exports = {
  // TODO: fix creating friend even when it has already exist

  createFriend: async (req, res) => {
    let friend = new UserFriends(req.body);
    friend.Status = "friend";
    friend
      .save()
      .then((friend) => {
        if (friend) {
          res.send("Friend created");
        }
      })
      .catch(() => {
        res.send("Error");
      });
  },

  // TODO: method below works incorrect

  getAllFriends: async (req, res) => {
    await UserFriends.findAll({
      attributes: ["In_User_ID", "Status"],
      include: [
        {
          model: User,
          as: "Out_User",
          attributes: ["User_ID", "Username", "Image", "University_Visibility"],
          include: [
            {
              model: University,
              attributes: ["University_Title"],
            },
          ],
        },
      ],
    }).then((data) => {
      res.send(data);
    });
  },

  // TODO: bad performance method

  getFriendsById: async (req, res) => {
    const dataF = await UserFriends.findAll({
      attributes: ["id"],
      where: { In_User_ID: req.params.id, Status: "friend" },
      as: "Friends_n_requests",
      include: [
        {
          model: User,
          as: "Out_User",
          attributes: [
            "User_ID",
            "Username",
            "Fullname",
            "Image",
            "University_Visibility",
          ],
          include: [
            {
              model: University,
              attributes: ["University_Title"],
            },
          ],
        },
      ],
    });

    await UserFriends.findAll({
      attributes: ["id"],
      where: { Out_User_ID: req.params.id, Status: "friend" },
      as: "Friends_n_requests",
      include: [
        {
          model: User,
          as: "In_User",
          attributes: [
            "User_ID",
            "Username",
            "Fullname",
            "Image",
            "University_Visibility",
          ],
          include: [
            {
              model: University,
              attributes: ["University_Title"],
            },
          ],
        },
      ],
    }).then((data) => {
      if (!data[0] && !dataF[0]) {
        return res.send([]);
      }
      res.send(data.concat(dataF));
    });
  },
  getInRequestsById: async (req, res) => {
    await UserFriends.findAll({
      attributes: ["id", "In_User_ID", "Out_User_ID", "Status"],
      where: { In_User_ID: req.params.id, Status: "request" },
      as: "Friends_n_requests",
      include: [
        {
          model: User,
          as: "Out_User",
          attributes: [
            "User_ID",
            "Username",
            "Fullname",
            "Image",
            "University_Visibility",
          ],
          include: [
            {
              model: University,
              attributes: ["University_Title"],
            },
          ],
        },
      ],
    }).then((data) => {
      if (!data[0]) {
        return res.send([]);
      }
      res.send(data);
    });
  },
  getOutRequestsById: async (req, res) => {
    await UserFriends.findAll({
      attributes: ["id", "In_User_ID", "Out_User_ID", "Status"],
      where: { Out_User_ID: req.params.id, Status: "request" },
      as: "Friends_n_requests",
      include: [
        {
          model: User,
          as: "In_User",
          attributes: [
            "User_ID",
            "Username",
            "Fullname",
            "Image",
            "University_Visibility",
          ],
          include: [
            {
              model: University,
              attributes: ["University_Title"],
            },
          ],
        },
      ],
    }).then((data) => {
      if (!data[0]) {
        return res.send([]);
      }
      res.send(data);
    });
  },
  updateFriend: async (req, res) => {
    await UserFriends.update(req.body, {
      where: { In_User_ID: req.params.id },
    }).then((success) => {
      if (success[0]) {
        res.send("Friend updating OK");
      } else {
        throw new NotFoundException("Error");
      }
    });
  },
  deleteFriend: async (req, res) => {
    await UserFriends.destroy({
      where: {
        In_User_ID: req.params.id,
        Out_User_ID: req.body.Out_User_ID,
        Status: "friend",
      },
    }).then((success) => {
      if (success) {
        res.send("Friend deleting OK");
      } else {
        throw new NotFoundException("Friend deleting error");
      }
    });
  },
};
