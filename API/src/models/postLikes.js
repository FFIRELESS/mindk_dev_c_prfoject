const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const PostLikes = sequelize.define(
  "Post_likes",
  {
    Post_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Post",
        key: "Post_ID",
      },
    },
    Like_User_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "Post_likes",
    schema: "public",
    timestamps: false,
  }
);

module.exports = PostLikes;
