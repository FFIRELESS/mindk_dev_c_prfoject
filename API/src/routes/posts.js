const router = require("express").Router();
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.send(await db.select().from("Post").orderBy("Post_ID"));
});

router.post("/", (req, res) => {
  db.insert({
    Post_ID: req.query.Post_ID,
    User_ID: req.query.User_ID,
    Title: req.query.Title,
    Timestamp: req.query.Timestamp,
    Text: req.query.Text,
    Visibility: req.query.Visibility,
  })
    .into("Post")
    .then(function () {
      res.send({ success: true, message: "Inserting OK" });
    });
});

router.put("/:Post_ID", (req, res) => {
  db.where({
    Post_ID: req.params.Post_ID,
  })
    .update({
      Title: req.query.Title,
      Timestamp: req.query.Timestamp,
      Text: req.query.Text,
      Visibility: req.query.Visibility,
    })
    .from("Post")
    .then(function () {
      res.send({ success: true, message: "Updating OK" });
    });
});

router.delete("/:Post_ID", (req, res) => {
  db.where({ Post_ID: req.params.Post_ID })
    .del()
    .from("Post")
    .then(function () {
      res.send({ success: true, message: "Deleting OK" });
    });
});

module.exports = router;
