const db = require("../db");

module.exports = {
  create: (session) => db("Sessions").insert(session),
  getByToken: (token) =>
    db.select().first().where("token", token).from("sessions"),
  deleteByToken: (token) => db("Sessions").where("token", token).del(),
  deleteAllTokens: (User_ID) => db("Sessions").where("User_ID", User_ID).del(),
};
