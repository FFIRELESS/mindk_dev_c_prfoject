// const express = require("express");
// const app = express();
//
// app.get("/", function (req, res) {
//   res.send("This is testing api");
// });
//
// console.log(process.env.APP_PORT);
// app.listen(process.env.APP_PORT);

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: "db",
  database: "postgres",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
pool.query("SELECT * FROM ex", (err, res) => {
  console.log(err, res);
  pool.end();
});
