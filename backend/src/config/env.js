import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "default_development_secret_key_12345",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
