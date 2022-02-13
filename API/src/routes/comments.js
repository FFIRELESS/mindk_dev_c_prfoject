const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");
const {
  getAllComments,
  getCommentLikes,
} = require("../services/store/comments.service");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(await getAllComments());
  })
);

router.get(
  "/:Comment_ID/likes",
  asyncHandler(async (req, res) => {
    res.send(await getCommentLikes(req.params.Comment_ID));
  })
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.insert({
      User_ID: req.body.User_ID,
      Post_ID: req.body.Post_ID,
      Repl_to_Comment_ID: req.body.Repl_to_Comment_ID,
      Text: req.body.Text,
    })
      .into("Comment")
      .then(function () {
        res.send({ success: true, message: "Inserting OK" });
      });
  })
);

router.put(
  "/:Comment_ID",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({ Comment_ID: req.params.Comment_ID })
      .update({ Text: req.body.Text })
      .from("Comment")
      .then(function () {
        res.send({ success: true, message: "Updating OK" });
      });
  })
);

router.delete(
  "/:Comment_ID",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({ Comment_ID: req.params.Comment_ID })
      .del()
      .from("Comment")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

module.exports = router;
