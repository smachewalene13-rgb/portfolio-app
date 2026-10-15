import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === "development") {
      return callback(null, true);
    }
    return callback(new Error("CORS policy does not allow access from this origin."));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsMiddleware = cors(corsOptions);
