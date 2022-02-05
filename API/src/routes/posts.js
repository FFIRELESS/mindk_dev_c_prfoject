const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const db = require("../services/db");
const multer = require("multer");

const {
  getAllPosts,
  getPostById,
  getPostComments,
  getPostLikes,
  getPostImage,
} = require("../services/store/posts.service");

const storage = multer.diskStorage({
  destination: "uploads/postImages",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(await getAllPosts());
  })
);

router.get(
  "/:Post_ID",
  asyncHandler(async (req, res) => {
    res.send(await getPostById(req.params.Post_ID));
  })
);

router.get(
  "/:Post_ID/image",
  asyncHandler(async (req, res) => {
    const img = await getPostImage(req.params.Post_ID);

    if (img === undefined) {
      res.send("Error");
      return;
    }
    if (img.Image === null) {
      res.end("Image does not set");
      return;
    }
    res.sendFile(img.Image, { root: "uploads/postImages" });
  })
);

router.get(
  "/:Post_ID/comments",
  asyncHandler(async (req, res) => {
    res.send(await getPostComments(req.params.Post_ID));
  })
);

router.get(
  "/:Post_ID/likes",
  asyncHandler(async (req, res) => {
    res.send(await getPostLikes(req.params.Post_ID));
  })
);

router.post("/", (req, res) => {
  db.insert({
    User_ID: req.body.User_ID,
    Title: req.body.Title,
    Text: req.body.Text,
    Visibility: req.body.Visibility,
  })
    .into("Post")
    .then(function () {
      res.send({ success: true, message: "Inserting OK" });
    });
});

router.post(
  "/:Post_ID/image",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    await db
      .update({ Image: req.file.filename })
      .from("Post")
      .where({ Post_ID: req.params.Post_ID })
      .then(function () {
        console.log(req.file);
        res.end("You post image is uploaded");
      });
  })
);

router.put("/:Post_ID", (req, res) => {
  db.where({
    Post_ID: req.params.Post_ID,
  })
    .update({
      User_ID: req.body.User_ID,
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
