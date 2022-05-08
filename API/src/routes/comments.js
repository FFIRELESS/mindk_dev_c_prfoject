const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");

const authMiddleware = require("../middlewares/authMiddleware");
const commentsController = require("../controller/comments");

router.get("/", asyncHandler(commentsController.getAllComments));
router.get("/:Comment_ID", asyncHandler(commentsController.getCommentById));
router.get(
  "/:Post_ID/post",
  asyncHandler(commentsController.getCommentsByPostId)
);

// TODO: implement methods below into commentsController

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
