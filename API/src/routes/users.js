const router = require("express").Router();
const db = require("../services/db");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const {
  getAllUsers,
  getUserAvatar,
  getUserById,
} = require("../services/store/users.service");

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
    res.send(await getUserById(req.params.User_ID));
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

router.post("/", (req, res) => {
  db.insert({
    University_ID: req.body.University_ID,
    Username: req.body.Username,
    Fullname: req.body.Fullname,
    Image: req.body.Image,
    Email: req.body.Email,
    Phone: req.body.Phone,
    AuthToken: req.body.AuthToken,
    FName_Visibility: req.body.FName_Visibility,
    Email_Visibility: req.body.Email_Visibility,
    Phone_Visibility: req.body.Phone_Visibility,
    University_Visibility: req.body.University_Visibility,
  })
    .into("User")
    .then(function () {
      res.send({ success: true, message: "Inserting OK" });
    });
});

router.put("/:User_ID", (req, res) => {
  db.where({ User_ID: req.params.User_ID })
    .update({
      Username: req.body.Username,
      University_ID: req.body.University_ID,
      Fullname: req.body.Fullname,
      Image: req.body.Image,
      Email: req.body.Email,
      Phone: req.body.Phone,
      AuthToken: req.body.AuthToken,
      FName_Visibility: req.body.FName_Visibility,
      Email_Visibility: req.body.Email_Visibility,
      Phone_Visibility: req.body.Phone_Visibility,
      University_Visibility: req.body.University_Visibility,
    })
    .from("User")
    .then(function () {
      res.send({ success: true, message: "Updating OK" });
    });
});

router.delete("/:User_ID", (req, res) => {
  db.where({ User_ID: req.params.User_ID })
    .del()
    .from("User")
    .then(function () {
      res.send({ success: true, message: "Deleting OK" });
    });
});

router.delete("/:User_ID/avatar", (req, res) => {
  db.where({ User_ID: req.params.User_ID })
    .update({
      Image: "default/icon.png",
    })
    .from("User")
    .then(function () {
      res.send({ success: true, message: "Deleting OK" });
    });
});

module.exports = router;
