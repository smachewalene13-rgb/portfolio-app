export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "test") {
    console.error(`[Error] ${req.method} ${req.url} - ${statusCode}: ${message}`);
    if (statusCode === 500 && err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
