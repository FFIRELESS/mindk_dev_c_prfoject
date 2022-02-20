const db = require("../db");

module.exports = {
  createUser: (user) => db("User").returning("User_ID").insert(user),
  getUsersValue: async () => db.select().first().count("User_ID").from("User"),
  getAllUsers: async () => db.select().from("User").orderBy("User_ID"),
  getAllUsersWithUniv: async () =>
    db
      .select("University.University_Title")
      .from("User")
      .join("University", { "User.University_ID": "University.University_ID" })
      .orderBy("User_ID"),
  getUserById: async (id) =>
    db.select().first().from("User").where({ User_ID: id }),
  getUserWithUnivById: async (id) =>
    db
      .select("University.University_Title")
      .first()
      .from("User")
      .join("University", { "User.University_ID": "University.University_ID" })
      .where({ User_ID: id }),
  getUserFriends: async (id) =>
    db
      .select("User.*")
      .from("Friends_n_requests")
      .join("User", { "User.User_ID": "Friends_n_requests.Out_User_ID" })
      .where({ In_User_ID: id, Status: "friend" }),
  updateUserById: (id, data) => db("User").where("User_ID", id).update(data),
  deleteUserById: (id) => db("User").where("User_ID", id).del(),
  getUserByEmail: (email) =>
    db.select().first().where("Email", email).from("User"),
  getUserAvatar: async (id) =>
    db.select("Image").first("Image").from("User").where({ User_ID: id }),
};
