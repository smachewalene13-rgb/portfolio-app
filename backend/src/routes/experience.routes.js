import { Router } from "express";
import { experienceController } from "../controllers/experience.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.get("/", experienceController.getExperience);
router.get("/:id", experienceController.getExperienceById);

// Admin-protected routes
router.post("/", authenticate, experienceController.createExperience);
router.put("/:id", authenticate, experienceController.updateExperience);
router.delete("/:id", authenticate, experienceController.deleteExperience);

export default router;
