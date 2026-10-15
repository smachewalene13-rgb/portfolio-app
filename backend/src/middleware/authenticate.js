import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("Access token is required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "change-this-to-a-long-random-string-in-production-abc123xyz789"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return next(ApiError.unauthorized("Invalid or expired access token"));
  }
}
