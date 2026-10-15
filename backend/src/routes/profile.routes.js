import { Router } from "express";
import { profileController } from "../controllers/profile.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public: view profile
router.get("/", profileController.getProfile);

// Admin only: update profile
router.put("/", authenticate, profileController.updateProfile);

export default router;
