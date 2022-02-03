module.exports = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("500: Internal server error");
  next();
};
