const jwt = require("jsonwebtoken");

const UnauthorizedException = require("../exceptions/UnauthorizedException");
const config = require("../services/config");

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, config.appKey, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    } catch (e) {
      // do nothing
    }
    if (decoded) {
      req.auth = decoded;
      return next();
    }
  }
  next(new UnauthorizedException());
};
