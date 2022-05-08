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

router.get("/", asyncHandler(usersController.getAllUsers));
router.get("/:User_ID", asyncHandler(usersController.getUserById));
router.get("/:User_ID/avatar", asyncHandler(usersController.getUserAvatar));

// TODO: needed aclMiddleware and authMiddleware at methods below

router.post(
  "/:User_ID/avatar",
  upload.single("avatar"),
  asyncHandler(usersController.setUserAvatar)
);

router.post("/", asyncHandler(usersController.createUser));
router.put("/:User_ID", asyncHandler(usersController.updateUserById));
router.delete("/:User_ID", asyncHandler(usersController.deleteUserById));
router.delete(
  "/:User_ID/avatar",
  asyncHandler(usersController.deleteUserAvatarById)
);

module.exports = router;
