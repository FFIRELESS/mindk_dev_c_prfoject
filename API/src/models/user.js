const sequelize = require("../services/db_orm");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    User_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    University_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "University",
        key: "University_ID",
      },
    },
    Username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Fullname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING(255),
      defaultValue: "default/icon.png",
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    FName_Visibility: {
      type: DataTypes.STRING(7),
      defaultValue: "all",
    },
    Email_Visibility: {
      type: DataTypes.STRING(7),
      defaultValue: "all",
    },
    Phone_Visibility: {
      type: DataTypes.STRING(7),
      defaultValue: "all",
    },
    University_Visibility: {
      type: DataTypes.STRING(7),
      defaultValue: "all",
    },
    role: {
      type: DataTypes.STRING(5),
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "User",
    schema: "public",
    timestamps: false,
    indexes: [
      {
        name: "User_pkey",
        unique: true,
        fields: [{ name: "User_ID" }],
      },
      {
        name: "user_username_uindex",
        unique: true,
        fields: [{ name: "Username" }],
      },
    ],
  }
);

module.exports = User;
