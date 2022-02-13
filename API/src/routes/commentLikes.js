const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(await db.select().from("Comment_likes"));
  })
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.insert({
      Comment_ID: req.body.Comment_ID,
      Liked_by_User_ID: req.body.Liked_by_User_ID,
    })
      .into("Comment_likes")
      .then(function () {
        res.send({ success: true, message: "Inserting OK" });
      });
  })
);

router.delete(
  "/:Comment_ID/:Liked_by_User_ID",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({
      Comment_ID: req.params.Comment_ID,
      Liked_by_User_ID: req.params.Liked_by_User_ID,
    })
      .del()
      .from("Comment_likes")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

module.exports = router;
