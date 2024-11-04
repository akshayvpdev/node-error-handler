const CustomError = require("../utils/customError");

const prodErrors = (error, res) => {
  if (error?.isOperationError) {
    res.status(error.statusCode).json({
      code: error.statusCode,
      message: error.message,
      status: "error",
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const devErrors = (error, res) => {
  res.status(error.statusCode || 500).json({
    status: "error",
    message: error.message,
    stack: error.stack,
    details: {
      name: error.name,
      ...error,
    },
  });
};

const castErrorHandler = (err) => {
  const message = `Invalid value for field '${err.path}'`;
  return new CustomError(message, 400);
};

const duplicationErrorHandler = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field value entered: '${field}' - '${value}'`;
  return new CustomError(message, 400);
};

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((error) => ({
    field: error.path,
    message: error.message,
  }));
  return new CustomError(errors[0]?.message || "Validation failed", 400);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicationErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    prodErrors(error, res);
  } else {
    devErrors(error, res);
  }
};
