const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const postsController = require("../controller/posts");
// const authMiddleware = require("../middlewares/authMiddleware");

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

// TODO: needed aclMiddleware and authMiddleware at methods below
// router.use(authMiddleware);
// router.use(aclMiddleware);

router.post(
  "/",
  upload.single("image"),
  asyncHandler(postsController.createPost)
);
router.get("/", asyncHandler(postsController.getAllPosts));
router.get("/user/:id/", asyncHandler(postsController.getPostsByUserId));
router.get("/:id", asyncHandler(postsController.getPostById));
router.get("/:id/image", asyncHandler(postsController.getPostImage));
router.put(
  "/:id",
  upload.single("image"),
  asyncHandler(postsController.updatePost)
);
router.delete("/:id", asyncHandler(postsController.deletePost));
router.delete("/:id/image", asyncHandler(postsController.deletePostImage));

module.exports = router;
