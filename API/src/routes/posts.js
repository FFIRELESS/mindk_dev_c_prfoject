const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const postsController = require("../controller/posts");

// const authMiddleware = require("../middlewares/authMiddleware");
// const aclMiddleware = require("../middlewares/aclMiddleware");
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

router.get("/", async (req, res) => {
  res.send(await postsController.getAllPosts());
});

router.get("/:User_ID/user", async (req, res) => {
  res.send(await postsController.getPostsByUserId(req.params.User_ID));
});

router.get(
  "/:Post_ID",
  asyncHandler(async (req, res) => {
    const post = await postsController.getPostById(req.params.Post_ID);
    if (post) {
      return res.send(post);
    }
    throw new NotFoundException("post not found");
  })
);

router.get(
  "/:Post_ID/image",
  asyncHandler(async (req, res) => {
    const img = await postsController.getPostImage(req.params.Post_ID);
    if (img === undefined) {
      res.send("Error");
      return;
    }
    if (img === null) {
      throw new NotFoundException("Image does not exist");
    }
    res.sendFile(img.Image, { root: "uploads/postImages" });
  })
);

router.post(
  "/",
  // authMiddleware,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    await postsController.createPost(req);
    return res.send("Post inserting OK");
  })
);

router.put(
  "/:Post_ID",
  // authMiddleware,
  // aclMiddleware([
  //   {
  //     resource: "post",
  //     action: "update",
  //     possession: "own",
  //     getResource: (req) => getPostById(req.params.Post_ID),
  //     isOwn: (resource, userId) => resource.User_ID === userId,
  //   },
  // ]),
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const success = await postsController.updatePost(req);

    if (success[0]) {
      res.send("Post updating OK");
    } else {
      throw new NotFoundException("Post does not exist");
    }
  })
);

router.delete(
  "/:Post_ID",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    const success = await postsController.deletePost(req.params.Post_ID);

    if (success) {
      res.send("Post deleting OK");
    } else {
      throw new NotFoundException("Post does not exist");
    }
  })
);

router.delete(
  "/:Post_ID/image",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    const success = await postsController.deletePostImage(req.params.Post_ID);

    if (success[0]) {
      res.send("Image deleting OK");
    } else {
      throw new NotFoundException("Post does not exist");
    }
  })
);

module.exports = router;
