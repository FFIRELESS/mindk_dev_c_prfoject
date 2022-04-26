const Logs = require("../models/logs");

module.exports = (req, res, next) => {
  const log = new Logs();
  log.method = req.method;
  log.path = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  log.save().then(() => {
    next();
  });
};
