const NotFoundException = require("../exceptions/NotFoundException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const ForbiddenException = require("../exceptions/ForbiddenException");

module.exports = (err, req, res, next) => {
  console.log();
  console.log("ERROR");
  console.log(err.message);
  console.log();
  if (err instanceof NotFoundException) {
    return res.status(404).send({ error: err.message });
  } else if (err instanceof UnauthorizedException) {
    return res.status(401).send({ error: "Unauthorized" });
  } else if (err instanceof ForbiddenException) {
    return res.status(401).send({ error: "Forbidden" });
  }
  res.status(500).send("Something went wrong :(");
  next();
};
