const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const {
  getUserAvatar,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../services/store/users.service");
const {
  getAllUsers,
  getUserById,
  getUserFriends,
  getRequests,
} = require("../domain/user");

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

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send(await getAllUsers());
  })
);

router.get(
  "/:User_ID",
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.User_ID);
    return res.send(user);
  })
);

router.get(
  "/:User_ID/friends",
  asyncHandler(async (req, res) => {
    const friends = await getUserFriends(req.params.User_ID);
    return res.send(friends);
  })
);

router.get(
  "/:User_ID/requests",
  asyncHandler(async (req, res) => {
    const requests = await getRequests(req.params.User_ID);
    return res.send(requests);
  })
);

router.get(
  "/:User_ID/avatar",
  asyncHandler(async (req, res) => {
    const img = await getUserAvatar(req.params.User_ID);

    if (img === undefined) {
      res.send("Error");
      return;
    }

    if (img.Image === null) {
      res.sendFile("icon.png", { root: "uploads/default" });
    } else {
      res.sendFile(img.Image, { root: "uploads/avatars" });
    }
  })
);

router.post(
  "/:User_ID/avatar",
  // authMiddleware,
  upload.single("avatar"),
  asyncHandler(async (req, res) => {
    await db
      .update({ Image: req.file.filename })
      .from("User")
      .where({ User_ID: req.params.User_ID })
      .then(function () {
        console.log(req.file);
        res.end("You new avatar is uploaded");
      });
  })
);

router.post(
  "/",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    await createUser(req.body);
    return res.status(201).send("Created successfully");
  })
);

router.put(
  "/:User_ID",
  // authMiddleware,
  asyncHandler(async (req, res) => {
    await updateUserById(req.params.User_ID, req.body);
    return res.status(201).send("Updated successfully");
  })
);

router.delete(
  "/:User_ID",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await deleteUserById(req.params.User_ID);
    return res.status(201).send("Deleted successfully");
  })
);

router.delete(
  "/:User_ID/avatar",
  authMiddleware,
  asyncHandler(async (req, res) => {
    db.where({ User_ID: req.params.User_ID })
      .update({
        Image: "default/icon.png",
      })
      .from("User")
      .then(function () {
        res.send({ success: true, message: "Deleting OK" });
      });
  })
);

module.exports = router;
