const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const db = require("../services/db");
const multer = require("multer");

const {
  getPostComments,
  getPostImage,
} = require("../services/store/posts.service");

const {
  getPostById,
  getAllPosts,
  getPostLikesById,
} = require("../domain/posts");

const authMiddleware = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");
const NotFoundException = require("../exceptions/NotFoundException");

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
    const post = await getPostById(req.params.Post_ID);
    if (post) {
      return res.send(post);
    }
    throw new NotFoundException("post not found");
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
    res.send(await getPostLikesById(req.params.Post_ID));
  })
);

router.post(
  "/",
  // authMiddleware,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    db.insert({
      // auth может вызывать проблему при создании поста через приложение!
      User_ID: req.auth.User_ID,
      Title: req.body.Title,
      Text: req.body.Text,
      Visibility: req.body.Visibility,
      Image: req.file !== undefined ? req.file.filename : null,
    })
      .into("Post")
      .then(function () {
        res.end();
      });
    return res.end("Inserting OK");
  })
);

router.post(
  "/:Post_ID/image",
  // authMiddleware,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    db.update({ Image: req.file.filename })
      .from("Post")
      .where({ Post_ID: req.params.Post_ID })
      .then(function () {
        console.log(req.file);
        res.end("Your post image is changed");
      });
  })
);

router.put(
  "/:Post_ID",
  authMiddleware,
  aclMiddleware([
    {
      resource: "post",
      action: "update",
      possession: "own",
      getResource: (req) => getPostById(req.params.Post_ID),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (req.file !== undefined) {
      db.where({
        Post_ID: req.params.Post_ID,
      })
        .update({
          User_ID: req.body.User_ID,
          Title: req.body.Title,
          Timestamp: req.body.Timestamp,
          Text: req.body.Text,
          Visibility: req.body.Visibility,
          Image: req.file.filename,
        })
        .from("Post")
        .then(function () {
          res.end();
        });
    } else {
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
          res.end();
        });
    }
    return res.end("Updating OK");
  })
);

router.delete(
  "/:Post_ID",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({ Post_ID: req.params.Post_ID })
      .del()
      .from("Post")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

router.delete(
  "/:Post_ID/image",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({ Post_ID: req.params.Post_ID })
      .update({
        Image: null,
      })
      .from("Post")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

module.exports = router;
