const router = require("express").Router();
const db = require("../services/db");

const {
  getAllPosts,
  getPostById,
  getPostComments,
  getPostLikes,
} = require("../services/store/posts.service");

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(await getAllPosts());
});

router.get("/:Post_ID", async (req, res) => {
  res.send(await getPostById(req.params.Post_ID));
});

router.get("/:Post_ID/comments", async (req, res) => {
  res.send(await getPostComments(req.params.Post_ID));
});

router.get("/:Post_ID/likes", async (req, res) => {
  res.send(await getPostLikes(req.params.Post_ID));
});

router.post("/", (req, res) => {
  db.insert({
    User_ID: req.body.User_ID,
    Title: req.body.Title,
    Timestamp: req.body.Timestamp,
    Text: req.body.Text,
    Visibility: req.body.Visibility,
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
      Title: req.body.Title,
      Timestamp: req.body.Timestamp,
      Text: req.body.Text,
      Visibility: req.body.Visibility,
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
