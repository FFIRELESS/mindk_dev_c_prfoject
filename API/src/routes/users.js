const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const usersController = require("../controller/users");

const storage = multer.diskStorage({
  destination: "uploads/avatars",
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

router.post("/", asyncHandler(usersController.createUser));
router.post(
  "/:id/avatar",
  upload.single("avatar"),
  asyncHandler(usersController.createUserAvatar)
);
router.get("/", asyncHandler(usersController.getAllUsers));
router.get("/:id", asyncHandler(usersController.getUserById));
router.get("/:id/avatar", asyncHandler(usersController.getUserAvatar));
router.put("/:id", asyncHandler(usersController.updateUserById));
router.delete("/:id", asyncHandler(usersController.deleteUserById));
router.delete(
  "/:id/avatar",
  asyncHandler(usersController.deleteUserAvatarById)
);

module.exports = router;
