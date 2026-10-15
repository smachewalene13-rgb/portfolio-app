import { Router } from "express";
import { educationController } from "../controllers/education.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.get("/", educationController.getEducation);
router.get("/:id", educationController.getEducationById);

// Admin-protected routes
router.post("/", authenticate, educationController.createEducation);
router.put("/:id", authenticate, educationController.updateEducation);
router.delete("/:id", authenticate, educationController.deleteEducation);

export default router;
