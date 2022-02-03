const db = require("../db");

module.exports = {
  getAllComments: async () => db.select().from("Comment").orderBy("Comment_ID"),
  getCommentLikes: async (id) =>
    db.select().from("Comment_likes").where({ Comment_ID: id }),
};
