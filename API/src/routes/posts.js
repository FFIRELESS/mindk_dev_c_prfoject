const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const postsController = require("../controller/posts");
const authMiddleware = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { uploadToS3 } = require("../services/multer.config");

const validationRules = require("../services/validator.config");

router.get("/", asyncHandler(postsController.getAllPosts));
router.get("/user/:id/", asyncHandler(postsController.getPostsByUserId));
router.get("/:id", asyncHandler(postsController.getPostById));
router.get("/:id/image", asyncHandler(postsController.getPostImage));

router.use(authMiddleware);

router.post(
  "/",
  // validationMiddleware(validationRules.postRules),
  uploadToS3.single("image"),
  asyncHandler(postsController.createPost)
);
router.put(
  "/:id",
  validationMiddleware(validationRules.postRules),
  aclMiddleware([
    {
      resource: "post",
      action: "update",
      possession: "own",
      getResource: (req) => postsController.getPostBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  uploadToS3.single("image"),
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
