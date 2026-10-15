import express from "express";
import helmet from "helmet";
import { corsMiddleware } from "./config/cors.js";
import { config } from "./config/env.js";
import apiV1Router from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Legacy route imports for backwards compatibility
import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS
app.use(corsMiddleware);

// JSON body parser
app.use(express.json());

// General API rate limiter
app.use("/api", apiLimiter);

// Root health & status
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio API is operational",
    docs: "/api/v1/health",
  });
});

// Primary Versioned API (REST API v1)
app.use("/api/v1", apiV1Router);

// Backwards-compatible legacy route mappings (/api/auth, /api/projects, /api/skills, /api/messages)
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/messages", contactRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;