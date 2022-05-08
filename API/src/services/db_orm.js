const { Sequelize } = require("sequelize");
const config = require("./config");

module.exports = new Sequelize(
  config.dbDatabase,
  config.dbUser,
  config.dbPassword,
  {
    define: {
      freezeTableName: true,
    },
    dialect: "postgres",
    host: config.dbHost,
    port: config.dbPort,
  }
);
