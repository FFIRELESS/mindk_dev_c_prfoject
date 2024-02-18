const University = require("./university");
const User = require("./user");
const UserFriends = require("./userFriends");
const Post = require("./post");
const PostLikes = require("./postLikes");
const Comment = require("./comment");
const CommentLikes = require("./commentLikes");
const Sessions = require("./sessions");

Sessions.belongsTo(User, { as: "User", foreignKey: "User_ID" });
University.hasMany(User, { foreignKey: "University_ID" });

Comment.belongsTo(Comment, {
  as: "Repl_to_Comment",
  foreignKey: "Repl_to_Comment_ID",
});
Comment.hasMany(Comment, { as: "Comments", foreignKey: "Repl_to_Comment_ID" });
Comment.hasMany(CommentLikes, { foreignKey: "Comment_ID" });
Comment.belongsTo(Post, { foreignKey: "Post_ID" });
Comment.belongsTo(User, { foreignKey: "User_ID" });

CommentLikes.belongsTo(Comment, { as: "Comment", foreignKey: "Comment_ID" });
CommentLikes.belongsTo(User, {
  as: "Liked_by_User",
  foreignKey: "Liked_by_User_ID",
});

Post.hasMany(Comment, { foreignKey: "Post_ID" });
Post.hasMany(PostLikes, { foreignKey: "Post_ID" });
Post.belongsTo(User, { foreignKey: "User_ID" });

PostLikes.belongsTo(Post, { foreignKey: "Post_ID" });
PostLikes.belongsTo(User, { as: "Like_User", foreignKey: "Like_User_ID" });

User.belongsTo(University, { foreignKey: "University_ID" });
User.hasMany(Comment, { foreignKey: "User_ID" });
User.hasMany(CommentLikes, {
  as: "Comment_likes",
  foreignKey: "Liked_by_User_ID",
});
User.hasMany(UserFriends, {
  as: "Friends_n_requests",
  foreignKey: "In_User_ID",
});
User.hasMany(UserFriends, {
  as: "Out_Friends_n_requests",
  foreignKey: "Out_User_ID",
});
User.hasMany(Post, { foreignKey: "User_ID" });
User.hasMany(PostLikes, { as: "Post_likes", foreignKey: "Like_User_ID" });
User.hasMany(Sessions, { as: "Sessions", foreignKey: "User_ID" });

UserFriends.belongsTo(User, { as: "Out_User", foreignKey: "Out_User_ID" });
UserFriends.belongsTo(User, { as: "In_User", foreignKey: "In_User_ID" });

module.exports = {
  University,
  User,
  UserFriends,
  Post,
  PostLikes,
  Comment,
  CommentLikes,
  Sessions,
};
