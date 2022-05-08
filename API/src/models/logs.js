const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const Logs = sequelize.define(
  "logs",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    error: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "--",
    },
  },
  {
    sequelize,
    tableName: "logs",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "logs_pk",
        unique: true,
        fields: [{ name: "id" }],
      },
    ],
  }
);

module.exports = Logs;
