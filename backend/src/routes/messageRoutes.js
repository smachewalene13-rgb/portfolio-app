import { Router } from "express";
import {
  createMessage,
  listMessages,
  deleteMessage,
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createMessage);
router.get("/", requireAuth, listMessages);
router.delete("/:id", requireAuth, deleteMessage);

export default router;