const cors = require("cors");
const express = require("express");
const config = require("./services/config");
const bodyParser = require("body-parser");
const sequelize = require("./services/db_orm");
const models = require("./models/modelsRel"); // eslint-disable-line no-unused-vars
const googleStrategy = require("./services/google.strategy");

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const commLikesRoutes = require("./routes/commentLikes");
const postLikesRoutes = require("./routes/postLikes");
const authRoutes = require("./routes/auth");

const loggerMiddleware = require("./middlewares/loggerMiddleware");
const syncErrorHandler = require("./middlewares/syncErrorHandler");

const app = express();
const port = config.appPort;

googleStrategy().registerStrategy();

app.use(cors());
app.use(googleStrategy().passport.initialize());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(loggerMiddleware);

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/comm_likes", commLikesRoutes);
app.use("/post_likes", postLikesRoutes);
app.use("/auth", authRoutes);

app.use(syncErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(port);
    console.log("Server started at /localhost:" + port);
  } catch (e) {
    console.log(`Exception: ${e.message}`);
  }
};

start();
