const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const postsController = require("../controller/posts");

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

// router.use(authMiddleware);
// router.use(aclMiddleware);

router.get("/", asyncHandler(postsController.getAllPosts));
router.get("/:User_ID/user", asyncHandler(postsController.getPostsByUserId));
router.get("/:Post_ID", asyncHandler(postsController.getPostById));
router.get("/:Post_ID/image", asyncHandler(postsController.getPostImage));

// TODO: needed aclMiddleware and authMiddleware at methods below

router.post(
  "/",
  upload.single("image"),
  asyncHandler(postsController.createPost)
);
router.put(
  "/:Post_ID",
  upload.single("image"),
  asyncHandler(postsController.updatePost)
);
router.delete("/:Post_ID", asyncHandler(postsController.deletePost));
router.delete("/:Post_ID/image", asyncHandler(postsController.deletePostImage));

module.exports = router;
