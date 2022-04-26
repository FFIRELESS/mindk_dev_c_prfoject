const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const University = sequelize.define(
  "University",
  {
    University_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    University_Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "University",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "University_pkey",
        unique: true,
        fields: [{ name: "University_ID" }],
      },
    ],
  }
);

module.exports = University;
