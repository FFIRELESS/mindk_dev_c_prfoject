const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const Sessions = sequelize.define(
  "Sessions",
  {
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "User_ID",
      },
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Sessions",
    schema: "public",
    timestamps: false,
  }
);

module.exports = Sessions;
