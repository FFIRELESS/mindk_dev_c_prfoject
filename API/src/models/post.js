const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
  "Post",
  {
    Post_ID: {
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
    Title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Visibility: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Post",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "Post_pkey",
        unique: true,
        fields: [{ name: "Post_ID" }],
      },
    ],
  }
);

module.exports = Post;
