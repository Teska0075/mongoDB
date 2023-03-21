const error = (err, req, res, next) => {
  console.log("ERROR HANDLER" + err.stack.red);
  console.log("ERROR HANDLER" + err.name);

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Buruu butetstei id bna";
  }
  res.status(err.statusCode || 500).json({ message: err.message });
};
module.exports = error;
