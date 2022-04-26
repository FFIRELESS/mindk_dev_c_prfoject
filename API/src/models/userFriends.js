const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const UserFriends = sequelize.define(
  "Friends_n_requests",
  {
    In_User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
    Out_User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Friends_n_requests",
    schema: "public",
    timestamps: false,
  }
);

module.exports = UserFriends;
