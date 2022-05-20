const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const postsController = require("../controller/posts");
const authMiddleware = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");
const { uploadPostImage } = require("../services/multer.config");

router.get("/", asyncHandler(postsController.getAllPosts));
router.get("/user/:id/", asyncHandler(postsController.getPostsByUserId));
router.get("/:id", asyncHandler(postsController.getPostById));
router.get("/:id/image", asyncHandler(postsController.getPostImage));

router.use(authMiddleware);

router.post(
  "/",
  uploadPostImage.single("image"),
  asyncHandler(postsController.createPost)
);
router.put(
  "/:id",
  aclMiddleware([
    {
      resource: "post",
      action: "update",
      possession: "own",
      getResource: (req) => postsController.getPostBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  uploadPostImage.single("image"),
  asyncHandler(postsController.updatePost)
);
router.delete(
  "/:id",
  aclMiddleware([
    {
      resource: "post",
      action: "delete",
      possession: "own",
      getResource: (req) => postsController.getPostBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  asyncHandler(postsController.deletePost)
);
router.delete(
  "/:id/image",
  aclMiddleware([
    {
      resource: "post",
      action: "delete",
      possession: "own",
      getResource: (req) => postsController.getPostBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  asyncHandler(postsController.deletePostImage)
);

module.exports = router;
