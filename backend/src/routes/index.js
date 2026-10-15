import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import projectsRoutes from "./projects.routes.js";
import skillsRoutes from "./skills.routes.js";
import experienceRoutes from "./experience.routes.js";
import educationRoutes from "./education.routes.js";
import contactRoutes from "./contact.routes.js";
import { contactController } from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const apiV1Router = Router();

// Health check endpoint
apiV1Router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mounted domain routes
apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/profile", profileRoutes);
apiV1Router.use("/projects", projectsRoutes);
apiV1Router.use("/skills", skillsRoutes);
apiV1Router.use("/experience", experienceRoutes);
apiV1Router.use("/education", educationRoutes);
apiV1Router.use("/contact", contactRoutes);

// Explicit endpoints specified in REST API endpoint table
apiV1Router.get("/admin/messages", authenticate, contactController.getMessages);
apiV1Router.patch("/admin/messages/:id/read", authenticate, contactController.markAsRead);
apiV1Router.delete("/admin/messages/:id", authenticate, contactController.deleteMessage);

export default apiV1Router;
