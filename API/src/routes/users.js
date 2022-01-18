const router = require("express").Router();
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(await db.select().from("User").orderBy("User_ID"));
});

router.get("/:User_ID", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(
    await db.select().from("User").where({ User_ID: req.params.User_ID })
  );
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
