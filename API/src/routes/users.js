const router = require("express").Router();
const db = require("../services/db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});

router.get("/", async (req, res) => {
  res.send(await db.select().from("User").orderBy("User_ID"));
});

router.get("/:User_ID", async (req, res) => {
  res.send(
    await db.select().from("User").where({ User_ID: req.params.User_ID })
  );
});

router.get("/:User_ID/avatar", async (req, res) => {
  const img = await db
    .select("Image")
    .first("Image")
    .from("User")
    .where({ User_ID: req.params.User_ID });

  if (img === undefined) {
    res.send("Error");
    return;
  }

  if (img.Image === null) {
    res.sendFile("icon.png", { root: "uploads/default" });
  } else {
    res.sendFile(img.Image, { root: "uploads/" });
  }
});

router.post("/:User_ID/avatar", upload.single("avatar"), async (req, res) => {
  await db
    .update({ Image: req.file.filename })
    .from("User")
    .where({ User_ID: req.params.User_ID })
    .then(function () {
      console.log(req.file);
      res.send("Success");
    });
});

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

module.exports = router;
