const router = require("express").Router();
const db = require("../services/db");

router.get("/", async (req, res) => {
  res.send(await db.select().from("User").orderBy("User_ID"));
});

router.post("/", async (req, res) => {
  res.send(
    await db.select().from("User").where({ University_Visibility: "all" })
  );
});

router.put("/:id", (req, res) => {
  res.send("Update OK");
});

router.delete("/:id", (req, res) => {
  res.send("Delete OK");
});

module.exports = router;
