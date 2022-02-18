const NotFoundException = require("../exceptions/NotFoundException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");

module.exports = (err, req, res, next) => {
  console.log("_______________________");
  console.log(err.message);
  if (err instanceof NotFoundException) {
    return res.status(404).send({ error: err.message });
  } else if (err instanceof UnauthorizedException) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  res.status(500).send("Something went wrong :(");
  next();
};
