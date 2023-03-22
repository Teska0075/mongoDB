// const logger = (req, res, next) => {
//   console.log("Middleware bnoo");
//   req.miniiNer = "Azure bna";
//   next();
// };

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
