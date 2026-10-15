import { Router } from "express";
import { skillsController } from "../controllers/skills.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.get("/", skillsController.getSkills);
router.get("/:id", skillsController.getSkill);

// Admin-protected routes
router.post("/", authenticate, skillsController.createSkill);
router.put("/:id", authenticate, skillsController.updateSkill);
router.delete("/:id", authenticate, skillsController.deleteSkill);

export default router;
