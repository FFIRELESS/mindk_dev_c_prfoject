const express = require("express");
const config = require("./services/config");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const commLikesRoutes = require("./routes/commentLikes");
const postLikesRoutes = require("./routes/postLikes");

const app = express();
const port = config.appPort;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/comm_likes", commLikesRoutes);
app.use("/post_likes", postLikesRoutes);

app.listen(port);
console.log("Server started at /localhost:" + port);
