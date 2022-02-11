const db = require("../db");

module.exports = {
  createUser: (user) => db("User").returning("User_ID").insert(user),
  getAllUsers: async () => db.select().from("User").orderBy("User_ID"),
  getUserById: async (id) => db.select().from("User").where({ User_ID: id }),
  updateUserById: (id, data) => db("User").where("User_ID", id).update(data),
  deleteUserById: (id) => db("User").where("User_ID", id).del(),
  getUserByEmail: (email) =>
    db.select().first().where("Email", email).from("Users"),
  getUserAvatar: async (id) =>
    db.select("Image").first("Image").from("User").where({ User_ID: id }),
};
