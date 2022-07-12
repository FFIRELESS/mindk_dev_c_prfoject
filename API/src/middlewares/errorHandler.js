const NotFoundException = require("../exceptions/NotFoundException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const ForbiddenException = require("../exceptions/ForbiddenException");
const UnprocessableEntityException = require("../exceptions/UnprocessableEntityException");

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
    return res.status(403).send({ error: "Forbidden" });
  } else if (err instanceof UnprocessableEntityException) {
    return res.status(422).send({ error: err.errors });
  }
  res.status(500).send("Something went wrong :(");
  next();
};
