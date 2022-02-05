const db = require("../db");

module.exports = {
  getAllPosts: async () => db.select().from("Post").orderBy("Post_ID"),
  getPostById: async (id) => db.select().from("Post").where({ Post_ID: id }),
  getPostImage: async (id) =>
    db.select("Image").first("Image").from("Post").where({ Post_ID: id }),
  getPostComments: async (id) =>
    db.select().from("Comment").where({ Post_ID: id }),
  getPostLikes: async (id) =>
    db.select().from("Post_likes").where({ Post_ID: id }),
};
