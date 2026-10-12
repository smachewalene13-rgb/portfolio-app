import { Router } from "express";
import {
  listSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listSkills);
router.get("/:id", getSkill);
router.post("/", requireAuth, createSkill);
router.put("/:id", requireAuth, updateSkill);
router.delete("/:id", requireAuth, deleteSkill);

export default router;