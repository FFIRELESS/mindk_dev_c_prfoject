const db = require("../db");

module.exports = {
  getAllPosts: async () => db.select().from("Post").orderBy("Post_ID"),
  getPostsValue: async () => db.select().first().count("Post_ID").from("Post"),
  getAllPostsWithUsers: async () =>
    db
      .select("User.Username", "User.Fullname")
      .from("Post")
      .join("User", { "User.User_ID": "Post.User_ID" })
      .orderBy("Post_ID"),
  getPostById: async (id) =>
    db.select().first().from("Post").where({ Post_ID: id }),
  getPostWithUserById: async (id) =>
    db
      .select("Username", "Fullname")
      .first()
      .from("User")
      .where({ User_ID: id }),
  getPostImage: async (id) =>
    db.select("Image").first("Image").from("Post").where({ Post_ID: id }),
  getPostComments: async (id) =>
    db.select().from("Comment").where({ Post_ID: id }),
  getPostLikes: async (id) =>
    db
      .select("Like_User_ID")
      .from("Post_likes")
      .where({ Post_ID: id })
      .orderBy("Post_ID"),
  countAllPostLikes: async () =>
    db.select().count("Like_User_ID").from("Post_likes").groupBy("Post_ID"),
  countPostLikes: async (id) =>
    db
      .select()
      .first()
      .count("Like_User_ID")
      .from("Post_likes")
      .where({ Post_ID: id }),
};
