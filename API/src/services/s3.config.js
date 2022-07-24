const aws = require("aws-sdk");
const config = require("./config");

module.exports = new aws.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretKey,
});
