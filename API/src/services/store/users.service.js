const db = require("../db");

module.exports = {
  getAllUsers: async () => db.select().from("User").orderBy("User_ID"),
  getUserById: async (id) => db.select().from("User").where({ User_ID: id }),
  getUserAvatar: async (id) =>
    db.select("Image").first("Image").from("User").where({ User_ID: id }),
};
