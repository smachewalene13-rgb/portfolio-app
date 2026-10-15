import { Router } from "express";
import { projectsController } from "../controllers/projects.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.get("/", projectsController.getProjects);
router.get("/:id", projectsController.getProject);

// Admin-protected routes
router.post("/", authenticate, projectsController.createProject);
router.put("/:id", authenticate, projectsController.updateProject);
router.delete("/:id", authenticate, projectsController.deleteProject);

export default router;
