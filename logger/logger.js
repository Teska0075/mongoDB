const logger = (req, res, next) => {
  console.log("Middleware bnoo");
  req.miniiNer = "Azure bna";
  next();
};

module.exports = logger;
