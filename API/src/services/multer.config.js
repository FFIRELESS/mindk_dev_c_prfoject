const multer = require("multer");

const postImagesStorage = multer.diskStorage({
  destination: "uploads/postImages",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const userImagesStorage = multer.diskStorage({
  destination: "uploads/avatars",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadPostImage = multer({
  storage: postImagesStorage,
  limits: {
    fileSize: 10000000,
  },
});

const uploadUserAvatar = multer({
  storage: userImagesStorage,
  limits: {
    fileSize: 10000000,
  },
});

module.exports = { uploadPostImage, uploadUserAvatar };
