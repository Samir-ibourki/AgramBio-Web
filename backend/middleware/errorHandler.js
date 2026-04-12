const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
