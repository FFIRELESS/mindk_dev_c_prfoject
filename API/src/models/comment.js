const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    Comment_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
    Post_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Post",
        key: "Post_ID",
      },
    },
    Repl_to_Comment_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Comment",
        key: "Comment_ID",
      },
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    tableName: "Comment",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Comment_pkey",
        unique: true,
        fields: [{ name: "Comment_ID" }],
      },
    ],
  }
);

module.exports = Comment;
