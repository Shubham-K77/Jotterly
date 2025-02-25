const notFoundError = (req, res, next) => {
  res.status(404);
  const error = new Error("The Resource/Url Not Found!");
  next(error);
};

const errorHandle = (error, req, res, next) => {
  let message = error.message;
  let code = res.statusCode === 200 ? 500 : res.statusCode;
  if (error.kind === "ObjectId" && error.name === "CastError") {
    message = new Error("MongoDb Error!");
    res.status(500);
  }
  res.status(code).send({ message, code, status: "Error!" });
  console.error(error);
};

export { notFoundError, errorHandle };
