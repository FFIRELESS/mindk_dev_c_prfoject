const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(await db.select().from("Post_likes"));
  })
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.insert({
      Post_ID: req.body.Post_ID,
      Like_User_ID: req.body.Like_User_ID,
    })
      .into("Post_likes")
      .then(function () {
        res.send({ success: true, message: "Inserting OK" });
      });
  })
);

router.delete(
  "/:Post_ID/:Like_User_ID",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({
      Post_ID: req.params.Post_ID,
      Like_User_ID: req.params.Like_User_ID,
    })
      .del()
      .from("Post_likes")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

module.exports = router;
