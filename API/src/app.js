const express = require("express");
const config = require("./services/config");
const bodyParser = require("body-parser");
const db = require("./services/db");
const cors = require("cors");
const googleStrategy = require("./services/google.strategy");
const { registerStrategy, passport } = googleStrategy();

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const commLikesRoutes = require("./routes/commentLikes");
const postLikesRoutes = require("./routes/postLikes");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const syncErrorHandler = require("./middlewares/syncErrorHandler");

const app = express();
const port = config.appPort;

registerStrategy();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  loggerMiddleware({
    logTableName: "logs",
    db,
  })
);

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/comm_likes", commLikesRoutes);
app.use("/post_likes", postLikesRoutes);

app.use(syncErrorHandler);

app.listen(port);
console.log("Server started at /localhost:" + port);
