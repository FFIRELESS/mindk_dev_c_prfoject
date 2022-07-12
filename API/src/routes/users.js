const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const usersController = require("../controller/users");
const authMiddleware = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { uploadUserAvatar } = require("../services/multer.config");

const validationRules = require("../services/validator.config");

router.get("/", asyncHandler(usersController.getAllUsers));
router.get("/:id", asyncHandler(usersController.getUserById));
router.get("/:id/avatar", asyncHandler(usersController.getUserAvatar));

router.use(authMiddleware);

router.post(
  "/",
  validationMiddleware(validationRules.userRules, {
    Email: {
      getResourceByField: (email) => usersController.getUserByEmail(email),
    },
    Username: {
      getResourceByField: (username) =>
        usersController.getUserByUsername(username),
    },
  }),
  asyncHandler(usersController.createUser)
);
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
  validationMiddleware(validationRules.userRules, {
    Email: {
      getResource: (req) => usersController.getUserBy(req.params.id),
      getResourceByField: (email) => usersController.getUserByEmail(email),
    },
    Username: {
      getResource: (req) => usersController.getUserBy(req.params.id),
      getResourceByField: (username) =>
        usersController.getUserByUsername(username),
    },
  }),
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
