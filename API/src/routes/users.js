const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const usersController = require("../controller/users");
const authMiddleware = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");
const { uploadUserAvatar } = require("../services/multer.config");

// TODO: needed aclMiddleware and authMiddleware at methods below

router.get("/", asyncHandler(usersController.getAllUsers));
router.get("/:id", asyncHandler(usersController.getUserById));
router.get("/:id/avatar", asyncHandler(usersController.getUserAvatar));

router.use(authMiddleware);

router.post("/", asyncHandler(usersController.createUser));
router.post(
  "/:id/avatar",
  aclMiddleware([
    {
      resource: "user",
      action: "create",
      possession: "own",
      getResource: (req) => usersController.getUserBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  uploadUserAvatar.single("avatar"),
  asyncHandler(usersController.createUserAvatar)
);
router.put(
  "/:id",
  aclMiddleware([
    {
      resource: "user",
      action: "update",
      possession: "own",
      getResource: (req) => usersController.getUserBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  asyncHandler(usersController.updateUserById)
);
router.delete(
  "/:id",
  aclMiddleware([
    {
      resource: "user",
      action: "delete",
      possession: "own",
      getResource: (req) => usersController.getUserBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  asyncHandler(usersController.deleteUserById)
);
router.delete(
  "/:id/avatar",
  aclMiddleware([
    {
      resource: "user",
      action: "delete",
      possession: "own",
      getResource: (req) => usersController.getUserBy(req.params.id),
      isOwn: (resource, userId) => resource.User_ID === userId,
    },
  ]),
  asyncHandler(usersController.deleteUserAvatarById)
);

module.exports = router;
