import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Public: send contact message
router.post("/", contactLimiter, contactController.submitMessage);

// Admin-protected: view, update read status, and delete messages
router.get("/messages", authenticate, contactController.getMessages);
router.get("/", authenticate, contactController.getMessages); // alias
router.get("/:id", authenticate, contactController.getMessage);
router.patch("/messages/:id/read", authenticate, contactController.markAsRead);
router.patch("/:id/read", authenticate, contactController.markAsRead);
router.delete("/messages/:id", authenticate, contactController.deleteMessage);
router.delete("/:id", authenticate, contactController.deleteMessage);

export default router;
