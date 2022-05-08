const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const CommentLikes = sequelize.define(
  "Comment_likes",
  {
    Comment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Comment",
        key: "Comment_ID",
      },
    },
    Liked_by_User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
  },
  {
    sequelize,
    tableName: "Comment_likes",
    schema: "public",
    timestamps: false,
  }
);

module.exports = CommentLikes;
