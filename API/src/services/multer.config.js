const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3.config");
const config = require("./config");

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

const S3Storage = multerS3({
  s3: s3,
  bucket: config.awsBucket,
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
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

const uploadToS3 = multer({
  storage: S3Storage,
});

module.exports = { uploadPostImage, uploadUserAvatar, uploadToS3 };
