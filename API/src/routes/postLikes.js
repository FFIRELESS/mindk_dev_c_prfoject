const router = require("express").Router();
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.send(await db.select().from("Post_likes"));
});

router.post("/", (req, res) => {
  db.insert({
    Post_ID: req.query.Post_ID,
    Like_User_ID: req.query.Like_User_ID,
  })
    .into("Post_likes")
    .then(function () {
      res.send({ success: true, message: "Inserting OK" });
    });
});

router.delete("/:Post_ID/:Like_User_ID", (req, res) => {
  db.where({
    Post_ID: req.params.Post_ID,
    Like_User_ID: req.params.Like_User_ID,
  })
    .del()
    .from("Post_likes")
    .then(function () {
      res.send({ success: true, message: "Deleting OK" });
    });
});

module.exports = router;
