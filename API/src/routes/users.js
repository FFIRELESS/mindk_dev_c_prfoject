const router = require("express").Router();
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.send(await db.select().from("User").orderBy("User_ID"));
});

router.post("/", (req, res) => {
  db.insert({
    User_ID: req.query.User_ID,
    University_ID: req.query.University_ID,
    Username: req.query.Username,
    Fullname: req.query.Fullname,
    Image: req.query.Image,
    Email: req.query.Email,
    Phone: req.query.Phone,
    AuthToken: req.query.AuthToken,
    FName_Visibility: req.query.FName_Visibility,
    Email_Visibility: req.query.Email_Visibility,
    Phone_Visibility: req.query.Phone_Visibility,
    University_Visibility: req.query.University_Visibility,
  })
    .into("User")
    .then(function () {
      res.send({ success: true, message: "Inserting OK" });
    });
});

router.put("/:User_ID", (req, res) => {
  db.where({ User_ID: req.params.User_ID })
    .update({
      Username: req.query.Username,
      Fullname: req.query.Fullname,
      Image: req.query.Image,
      Email: req.query.Email,
      Phone: req.query.Phone,
      AuthToken: req.query.AuthToken,
      FName_Visibility: req.query.FName_Visibility,
      Email_Visibility: req.query.Email_Visibility,
      Phone_Visibility: req.query.Phone_Visibility,
      University_Visibility: req.query.University_Visibility,
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
